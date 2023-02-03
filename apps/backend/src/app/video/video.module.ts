import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideoRepository } from './video.repository';
import { AnimeModule } from '../anime/anime.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    AnimeModule,
  ],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository],
})
export class VideoModule { }
