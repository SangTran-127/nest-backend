import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comment } from './../schemas/comment.schema';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CommentRepository extends BaseRepository<CommentDocument> {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {
    super(commentModel);
  }
}
