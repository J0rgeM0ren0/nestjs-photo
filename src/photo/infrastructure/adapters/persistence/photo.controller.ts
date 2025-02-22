import { Controller, Post, Body, Get, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../../../security/jwt-auth.guard';
import { CreatePhotoDto } from '../../../application/dto/create-photo.dto';
import { UploadPhotoUseCase } from '../../../application/use-cases/upload-photo.use-case';
import { GetPhotosUseCase } from '../../../application/use-cases/get-photos.use-case';
import { DeletePhotoUseCase } from '../../../application/use-cases/delete-photo.use-case';

@Controller('photos')
export class PhotoController {
    constructor(
        private readonly uploadPhotoUseCase: UploadPhotoUseCase,
        private readonly getPhotosUseCase: GetPhotosUseCase,
        private readonly deletePhotoUseCase: DeletePhotoUseCase,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    async upload(
        @Body() createPhotoDto: CreatePhotoDto,
        @Request() req: any,
    ) {
        const user = req.user;
        return this.uploadPhotoUseCase.execute(createPhotoDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('my-photos')
    async getPhotos(@Request() req: any) {
        const user = req.user;
        return this.getPhotosUseCase.execute(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async delete(
        @Param('id') id: string,
        @Request() req: any,
    ) {
        const user = req.user;
        return this.deletePhotoUseCase.execute(id, user);
    }
}