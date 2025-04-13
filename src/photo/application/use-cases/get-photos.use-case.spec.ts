import { GetPhotosUseCase } from './get-photos.use-case';
import { PhotoService } from '../../domain/services/photo.service';
import { UserPhotoDto } from '../dto/user-photo.dto';
import {arrayPhoto, userDto} from "../../../../__mocks__/photoMock";

describe('GetPhotosUseCase', () => {
    let useCase: GetPhotosUseCase;
    let photoService: PhotoService;

    beforeEach(() => {
        photoService = {
            findAll: jest.fn(),
        } as unknown as PhotoService;

        useCase = new GetPhotosUseCase(photoService);
    });

    it('should call photoService.findAll with the correct user and return photos', async () => {
        const mockUser: UserPhotoDto = userDto;
        const mockPhotos = arrayPhoto;

        (photoService.findAll as jest.Mock).mockResolvedValue(mockPhotos);

        const result = await useCase.execute(mockUser);

        expect(photoService.findAll).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(mockPhotos);
    });
});