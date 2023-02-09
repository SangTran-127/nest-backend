import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;
  @Prop({ required: true })
  content: string;
  @Prop({ default: Date.now, type: Date })
  createdDate: Date;
  @Prop({ default: 0 })
  like: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
