import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { RefreshToken } from 'src/common/schemas/refresh-token.schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  refreshTokens: RefreshToken[];
}
