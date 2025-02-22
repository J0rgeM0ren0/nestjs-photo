import { Injectable } from '@nestjs/common';
import { PhotoService } from '../../domain/services/photo.service';
import { User } from '../../../shared/entities/user.entity';

@Injectable()
export class DeletePhotoUseCase {
    constructor(private readonly photoService: PhotoService) {}

    async execute(id: string, user: User) {
        return this.photoService.delete(id, user);
    }
}