import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from './photo.controller';
import { UploadPhotoUseCase } from '../../../application/use-cases/upload-photo.use-case';
import { GetPhotosUseCase } from '../../../application/use-cases/get-photos.use-case';
import { DeletePhotoUseCase } from '../../../application/use-cases/delete-photo.use-case';
import { JwtAuthGuard } from "../../../../security/jwt-auth.guard";

import { CreatePhotoDto } from '../../../application/dto/create-photo.dto';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";
import {CreatePhoto, userId} from "../../../../../__mocks__/photoMock";

class MockJwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        request.user = { id: 'user123' };
        return true;
    }
}

describe('PhotoController', () => {
    let controller: PhotoController;
    let uploadPhotoUseCase: UploadPhotoUseCase;
    let getPhotosUseCase: GetPhotosUseCase;
    let deletePhotoUseCase: DeletePhotoUseCase;

    const mockUpload = { execute: jest.fn() };
    const mockGet = { execute: jest.fn() };
    const mockDelete = { execute: jest.fn() };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PhotoController],
            providers: [
                { provide: UploadPhotoUseCase, useValue: mockUpload },
                { provide: GetPhotosUseCase, useValue: mockGet },
                { provide: DeletePhotoUseCase, useValue: mockDelete },
                {
                    provide: JwtService,
                    useValue: {
                        verify: jest.fn().mockReturnValue({ id: 'mock-user-id' }),
                    },
                }
            ],
        }).compile();

        controller = module.get<PhotoController>(PhotoController);
        uploadPhotoUseCase = module.get<UploadPhotoUseCase>(UploadPhotoUseCase);
        getPhotosUseCase = module.get<GetPhotosUseCase>(GetPhotosUseCase);
        deletePhotoUseCase = module.get<DeletePhotoUseCase>(DeletePhotoUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call uploadPhotoUseCase with correct params', async () => {
        const dto: CreatePhotoDto = CreatePhoto;
        const user = userId;

        (uploadPhotoUseCase.execute as jest.Mock).mockResolvedValue('photo_uploaded');

        const result = await controller.upload(dto, { user });

        expect(uploadPhotoUseCase.execute).toHaveBeenCalledWith(dto, user);
        expect(result).toBe('photo_uploaded');
    });

    it('should call getPhotosUseCase with correct user', async () => {
        const user = userId;

        (getPhotosUseCase.execute as jest.Mock).mockResolvedValue(['photo1', 'photo2']);

        const result = await controller.getPhotos({ user });

        expect(getPhotosUseCase.execute).toHaveBeenCalledWith(user);
        expect(result).toEqual(['photo1', 'photo2']);
    });
    
    it('should call deletePhotoUseCase with correct id and user', async () => {
        const user = userId;
        const id = 'photo1';

        (deletePhotoUseCase.execute as jest.Mock).mockResolvedValue('photo_deleted');

        const result = await controller.delete(id, { user });

        expect(deletePhotoUseCase.execute).toHaveBeenCalledWith(id, user);
        expect(result).toBe('photo_deleted');
    });
});