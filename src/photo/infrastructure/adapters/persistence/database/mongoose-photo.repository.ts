import { Injectable } from '@nestjs/common';
import { PhotoService } from '../../../../domain/services/photo.service';
import { CreatePhotoDto } from '../../../../application/dto/create-photo.dto';
import {UserPhotoDto} from "../../../../application/dto/user-photo.dto";

@Injectable()
export class MongoosePhotoRepository {
    constructor(private readonly photoService: PhotoService) {}

    async create(createPhotoDto: CreatePhotoDto, user: UserPhotoDto) {
        return this.photoService.create(createPhotoDto, user);
    }

    async findAll(user: UserPhotoDto) {
        return this.photoService.findAll(user);
    }

    async delete(id: string, user: UserPhotoDto) {
        return this.photoService.delete(id, user);
    }
}