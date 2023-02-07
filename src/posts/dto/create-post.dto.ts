import { IsNotEmpty } from 'class-validator';
import { User } from 'src/common/schemas/user.schema';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  author: User = {
    username: '',
    password: '',
  };
}
