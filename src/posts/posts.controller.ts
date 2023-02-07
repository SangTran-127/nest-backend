import { UserDocument } from './../common/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/common/schemas/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Req() req: Request, @Body() postDto: CreatePostDto) {
    return await this.postService.createPost(req.user as User, postDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('own')
  async showOwnPosts(@Req() req: Request) {
    return await this.postService.showOwnPosts(req.user as UserDocument);
  }
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return await this.postService.getPostById(id);
  }
  // @Get(':id/comment')
  // async getCommentByPostId(@Param('id') id: string) {
  //   return await this.postService.getCommentByPostId(id);
  // }
  @UseGuards(AuthGuard('jwt'))
  @Post('comments')
  async commentPost(
    @Req() req: Request,
    @Body('blog_id') blog_id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.postService.commentPost(
      req.user as UserDocument,
      blog_id,
      createCommentDto,
    );
  }
}
