import { VideoCreate } from '@japan-town/contracts';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('create')
  async create(@Body() dto: VideoCreate.Request) {
    return this.videoService.create(dto);
  }

  @Get('getEpisodesList/:animeName')
  async getEpisodesList(@Param('animeName') animeName: string) {
    return this.videoService.find(animeName);
  }

  //   @Get()
  //   findAll() {
  //     return this.videoService.findAll();
  //   }
  //
  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.videoService.findOne(+id);
  //   }
  //
  //   @Patch(':id')
  //   update() {
  //     return this.videoService.update();
  //   }
  // //
  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.videoService.remove(+id);
  //   }
}
