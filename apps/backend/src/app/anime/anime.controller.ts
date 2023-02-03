import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnimeRepository } from './anime.repository';
import { AnimeService } from './anime.service';
import { AnimeCreate } from '@japan-town/contracts';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('/getAnimeList')
  async getAnimeList() {
    return this.animeService.getAnimeList();
  }

  @Post('/createAnime')
  async createAnime(
    @Body() dto: AnimeCreate.Request
  ): Promise<AnimeCreate.Response> {
    return this.animeService.create(dto);
  }

  @Get('/getAnime/:title')
  async findAnime(@Param('title') animeName: string) {
    return this.animeService.findByTitle(animeName);
  }
}
