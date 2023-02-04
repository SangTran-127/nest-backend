import {
  RefreshToken,
  RefreshTokenDocument,
} from './../schemas/refresh-token.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';

@Injectable()
export class RefreshTokenReposity extends BaseRepository<RefreshTokenDocument> {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {
    super(refreshTokenModel);
  }
}
