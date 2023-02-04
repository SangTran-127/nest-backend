import { User, UserDocument } from '../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserReposity extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
