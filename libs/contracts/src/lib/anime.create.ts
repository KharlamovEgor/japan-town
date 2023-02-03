import { Types } from 'mongoose';

export namespace AnimeCreate {
  export class Request {
    title: string;
    productionYear: number;
    description: string;
    countOfEpisodes: number;
  }

  export class Response {
    _id: Types.ObjectId;
    title: string;
    productionYear: number;
    description: string;
    countOfEpisodes: number;
  }
}
