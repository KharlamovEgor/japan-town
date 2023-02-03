import { AnimeCreate } from '@japan-town/contracts';
import { Injectable } from '@nestjs/common';
import { AnimeRepository } from './anime.repository';

@Injectable()
export class AnimeService {
  constructor(private readonly animeRepository: AnimeRepository) { }

  async getAnimeList(): Promise<string[]> {
    const animeInfoList = await this.animeRepository.findAll();

    return animeInfoList.map((animeInfo) => animeInfo.title);
  }

  async create(createAnimeInfo: AnimeCreate.Request) {
    return this.animeRepository.create(createAnimeInfo);
  }

  async findByTitle(title: string) {
    return this.animeRepository.findByTitle(title);
  }
}
