import { Module } from '@nestjs/common';
import { PhotoController } from './infrastructure/adapters/persistence/photo.controller';
import { PhotoService } from './domain/services/photo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './domain/entities/photo.entity';
import { MongoosePhotoRepository } from './infrastructure/adapters/persistence/database/mongoose-photo.repository';
import { UploadPhotoUseCase } from './application/use-cases/upload-photo.use-case';
import { GetPhotosUseCase } from './application/use-cases/get-photos.use-case';
import { DeletePhotoUseCase } from './application/use-cases/delete-photo.use-case';

@Module({
    imports: [MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }])],
    controllers: [PhotoController],
    providers: [
        PhotoService,
        UploadPhotoUseCase,
        GetPhotosUseCase,
        DeletePhotoUseCase,
        {
            provide: 'PhotoRepository',
            useClass: MongoosePhotoRepository,
        },
    ],
})
export class PhotoModule {}