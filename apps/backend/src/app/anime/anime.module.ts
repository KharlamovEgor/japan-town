import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimeController } from './anime.controller';
import { AnimeRepository } from './anime.repository';
import { AnimeService } from './anime.service';
import { Anime, AnimeSchema } from './schemas/anime.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  controllers: [AnimeController],
  providers: [AnimeRepository, AnimeService],
  exports: [AnimeService],
})
export class AnimeModule { }
