import { Injectable } from '@nestjs/common';
import { PhotoService } from '../../domain/services/photo.service';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { UserPhotoDto } from '../dto/user-photo.dto';

@Injectable()
export class UploadPhotoUseCase {
    constructor(private readonly photoService: PhotoService) {}

    async execute(createPhotoDto: CreatePhotoDto, user: UserPhotoDto) {
        return this.photoService.create(createPhotoDto, user);
    }
}