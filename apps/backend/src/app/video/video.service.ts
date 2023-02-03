import { Inject, Injectable } from '@nestjs/common';
import { VideoCreate } from '@japan-town/contracts';
import { VideoRepository } from './video.repository';
import { AnimeService } from '../anime/anime.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly animeService: AnimeService
  ) { }

  async create({ animeName, url, episodeNumber }: VideoCreate.Request) {
    const anime = await this.animeService.findByTitle(animeName);

    return this.videoRepository.create({ anime, url, episodeNumber });
  }

  async find(animeName: string) {
    const anime = await this.animeService.findByTitle(animeName);

    return this.videoRepository.findByAnimeId(anime._id)
  }
}
