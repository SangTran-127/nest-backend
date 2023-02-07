import { CommentRepository } from './../common/repository/comment.repository';
import { PostRepository } from './../common/repository/post.repository';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/common/schemas/post.schema';
import { User, UserSchema } from 'src/common/schemas/user.schema';
import { CommentSchema, Comment } from 'src/common/schemas/comment.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostRepository, CommentRepository],
})
export class PostsModule {}
