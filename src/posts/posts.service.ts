import { CommentRepository } from './../common/repository/comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User, UserDocument } from 'src/common/schemas/user.schema';
import { PostRepository } from './../common/repository/post.repository';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
  ) {}
  async createPost(user: User, post: CreatePostDto) {
    post.author = user;
    post.author.password = undefined;
    return await this.postRepository.create(post);
  }
  async getAllPost() {
    const allPosts = await this.postRepository.findAll();
    return await this.postRepository.populate(allPosts, {
      path: 'author',
      select: '-password',
    });
  }
  async getPostById(id: string) {
    const comments = await this.commentRepository.getByCondition({ post: id });
    console.log(comments);
    const post = await (
      await this.postRepository.findById(id)
    ).populate('author');
    return {
      post,
      comments,
    };
  }
  async showOwnPosts(user: UserDocument) {
    return await this.postRepository.getByCondition({ author: user._id });
  }
  async commentPost(
    user: UserDocument,
    blog_id: string,
    createCommentDto: CreateCommentDto,
  ) {
    createCommentDto.author = user;
    createCommentDto.post = await this.postRepository.findById(blog_id);
    return await this.commentRepository.create(createCommentDto);
  }
}
