import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    AnimeModule,
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/admin'),
    VideoModule,
  ],
})
export class AppModule {}
