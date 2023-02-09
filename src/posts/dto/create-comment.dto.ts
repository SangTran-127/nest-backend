import { IsNotEmpty } from 'class-validator';
import { Post } from 'src/common/schemas/post.schema';
import { User } from 'src/common/schemas/user.schema';

export class CreateCommentDto {
  @IsNotEmpty()
  post: Post = {} as Post;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  author: User = {} as User;
}
