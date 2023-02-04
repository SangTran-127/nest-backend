import { UserReposity } from 'src/common/repository/user.repository';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/common/schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserReposity],
  exports: [UsersService],
})
export class UsersModule {
  // constructor(private usersService: UsersService) {}
}
