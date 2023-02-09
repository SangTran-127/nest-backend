import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuIGBpSqN8Z68NA-PZJjIYQNIAzJosw4YWig&usqp=CAU',
  })
  avatarUrl: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  // refreshTokens: RefreshToken[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});
