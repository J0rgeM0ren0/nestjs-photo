import { UploadPhotoUseCase } from './upload-photo.use-case';
import { PhotoService } from '../../domain/services/photo.service';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { UserPhotoDto } from '../dto/user-photo.dto';
import {photo, userDto, createPhoto} from "../../../../__mocks__/photoMock";

describe('UploadPhotoUseCase', () => {
    let useCase: UploadPhotoUseCase;
    let photoService: PhotoService;

    beforeEach(() => {
        photoService = {
            create: jest.fn(),
        } as unknown as PhotoService;

        useCase = new UploadPhotoUseCase(photoService);
    });

    it('should call photoService.create with correct parameters and return the photo', async () => {
        const createPhotoDto: CreatePhotoDto = createPhoto;

        const user: UserPhotoDto = userDto;

        const mockPhoto = photo;

        (photoService.create as jest.Mock).mockResolvedValue(mockPhoto);

        const result = await useCase.execute(createPhotoDto, user);

        expect(photoService.create).toHaveBeenCalledWith(createPhotoDto, user);
        expect(result).toEqual(mockPhoto);
    });
});