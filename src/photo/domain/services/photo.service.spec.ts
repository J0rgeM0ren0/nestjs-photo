import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PhotoService } from './photo.service';
import { Photo } from '../entities/photo.entity';
import { Model } from 'mongoose';
import { CreatePhotoDto } from '../../application/dto/create-photo.dto';
import { UserPhotoDto } from '../../application/dto/user-photo.dto';
import {CreatePhoto, photo, userDto, userId} from "../../../../__mocks__/photoMock";

describe('PhotoService', () => {
    let service: PhotoService;
    let model: Model<Photo>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PhotoService,
                {
                    provide: getModelToken(Photo.name),
                    useValue: {
                        new: jest.fn().mockResolvedValue(photo),
                        constructor: jest.fn().mockResolvedValue(photo),
                        find: jest.fn().mockReturnValue({
                            exec: jest.fn().mockResolvedValue([photo]),
                        }),
                        findOne: jest.fn().mockReturnValue({
                            exec: jest.fn().mockResolvedValue(photo),
                        }),
                        deleteOne: jest.fn().mockResolvedValue(null),
                        create: jest.fn().mockResolvedValue(photo),
                        save: jest.fn().mockResolvedValue(photo),
                    },
                },
            ],
        }).compile();

        service = module.get<PhotoService>(PhotoService);
        model = module.get<Model<Photo>>(getModelToken(Photo.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create and return a photo', async () => {
        const createPhotoDto: CreatePhotoDto = CreatePhoto;
        const user: UserPhotoDto = userDto;

        const result = await service.create(createPhotoDto, user);
        expect(result).toEqual(photo);
    });

    it('should return an array of photos for a user', async () => {
        const user: UserPhotoDto = userDto;
        const result = await service.findAll(user);
        expect(result).toEqual([photo]);
        expect(model.find).toHaveBeenCalledWith({ user });
    });

    it('should delete a photo if it exists and belongs to the user', async () => {
        const user: UserPhotoDto = userDto;
        const id = userId;

        await expect(service.delete(id, user)).resolves.toBeUndefined();
        expect(model.findOne).toHaveBeenCalledWith({ _id: id, user });
        expect(model.deleteOne).toHaveBeenCalledWith({ _id: id });
    });

    it('should throw an error if photo does not exist or not owned by user', async () => {
        const user: UserPhotoDto = userDto;
        const id = 'test';

        jest.spyOn(model, 'findOne').mockReturnValueOnce({
            exec: jest.fn().mockResolvedValue(null),
        } as any);

        await expect(service.delete(id, user)).rejects.toThrowError(
            'Photo not found or you do not have permission to delete it',
        );
    });
});