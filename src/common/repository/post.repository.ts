import { BaseRepository } from './base.repository';
import { Post, PostDocument } from './../schemas/post.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostRepository extends BaseRepository<PostDocument> {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {
    super(postModel);
  }
}
