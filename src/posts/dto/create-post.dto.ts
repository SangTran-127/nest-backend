import { IsNotEmpty } from 'class-validator';
import { User } from 'src/common/schemas/user.schema';

export class CreatePostDto {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  author: User = {} as User;
}
