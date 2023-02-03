import { Types } from 'mongoose';

export namespace VideoCreate {
  export class Request {
    url: string;
    animeName: string;
    episodeNumber: number;
  }

  export class Response {
    _id: Types.ObjectId;
    url: string;
    anime: Anime;
    episodeNumber: number;
  }

  export interface Anime {
    title: string;
    productionYear: number;
    description: string;
    countOfEpisodes: number;
  }
}
