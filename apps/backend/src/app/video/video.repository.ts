import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';
@Injectable()
export class VideoRepository {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>
  ) { }

  async create(videoData: Video) {
    return this.videoModel.create(videoData);
  }

  async findByAnimeId(anime: Types.ObjectId) {
    return this.videoModel.find({ anime });
  }
}
