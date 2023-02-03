import { AnimeCreate } from '@japan-town/contracts';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime, AnimeDocument } from './schemas/anime.schema';

@Injectable()
export class AnimeRepository {
  constructor(
    @InjectModel(Anime.name) private animeModel: Model<AnimeDocument>
  ) { }

  async create(createAnimeInfo: AnimeCreate.Request): Promise<AnimeDocument> {
    return this.animeModel.create(createAnimeInfo);
  }

  async findAll(): Promise<Anime[]> {
    return this.animeModel.find().exec();
  }

  async findByTitle(title: string) {
    return this.animeModel.findOne({ title }).exec();
  }
}
