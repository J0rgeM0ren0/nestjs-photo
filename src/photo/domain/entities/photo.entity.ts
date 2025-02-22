import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {UserPhotoDto} from "../../application/dto/user-photo.dto";

@Schema()
export class Photo extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ type: UserPhotoDto, required: true })
    user: UserPhotoDto;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);