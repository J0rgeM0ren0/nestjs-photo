import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo } from '../entities/photo.entity';
import { CreatePhotoDto } from '../../application/dto/create-photo.dto';
import { UserPhotoDto } from '../../application/dto/user-photo.dto';

@Injectable()
export class PhotoService {
    constructor(
        @InjectModel(Photo.name) private readonly photoModel: Model<Photo>,
    ) {}

    async create(createPhotoDto: CreatePhotoDto, user: UserPhotoDto): Promise<Photo> {
        const photo = new this.photoModel({ ...createPhotoDto, user });
        return photo.save();
    }

    async findAll(user: UserPhotoDto): Promise<Photo[]> {
        return this.photoModel.find({ user }).exec();
    }

    async delete(id: string, user: UserPhotoDto): Promise<void> {
        const photo = await this.photoModel.findOne({ _id: id, user }).exec();
        if (!photo) {
            throw new Error('Photo not found or you do not have permission to delete it');
        }
        await this.photoModel.deleteOne({ _id: id });
    }
}