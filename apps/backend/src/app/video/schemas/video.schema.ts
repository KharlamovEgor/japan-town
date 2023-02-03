import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Anime } from '../../anime/schemas/anime.schema';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  episodeNumber: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Anime' })
  anime: Anime;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
