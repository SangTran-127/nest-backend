import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from './post.schema';
import { User } from './user.schema';
export type CommentDocument = HydratedDocument<Comment>;
@Schema()
export class Comment {
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
