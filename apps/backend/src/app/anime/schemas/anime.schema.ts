import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimeDocument = HydratedDocument<Anime>;

@Schema()
export class Anime {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  productionYear: number;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  countOfEpisodes: number;
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
