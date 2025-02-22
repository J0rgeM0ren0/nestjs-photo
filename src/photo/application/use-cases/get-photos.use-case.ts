import { Injectable } from '@nestjs/common';
import { PhotoService } from '../../domain/services/photo.service';
import {UserPhotoDto} from "../dto/user-photo.dto";

@Injectable()
export class GetPhotosUseCase {
    constructor(private readonly photoService: PhotoService) {}

    async execute(user: UserPhotoDto) {
        return this.photoService.findAll(user);
    }
}