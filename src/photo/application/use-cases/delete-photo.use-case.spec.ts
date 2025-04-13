import { DeletePhotoUseCase } from './delete-photo.use-case';
import { PhotoService } from '../../domain/services/photo.service';
import { User } from '../../../shared/entities/user.entity';
import {userId, userMock} from "../../../../__mocks__/photoMock";

describe('DeletePhotoUseCase', () => {
    let deletePhotoUseCase: DeletePhotoUseCase;
    let photoService: PhotoService;

    beforeEach(() => {
        photoService = {
            delete: jest.fn(),
        } as unknown as PhotoService;

        deletePhotoUseCase = new DeletePhotoUseCase(photoService);
    });

    it('should call photoService.delete with correct parameters', async () => {
        const id = userId;
        const user: User = userMock as User;

        await deletePhotoUseCase.execute(id, user);

        expect(photoService.delete).toHaveBeenCalledWith(id, user);
    });
});