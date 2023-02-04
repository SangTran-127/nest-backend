import {
  UserNotFoundException,
  UserAlreadyExistedException,
} from './../common/exception/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReposity } from 'src/common/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserReposity) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const userExisted = await this.userRepository.findByCondition({
      username: createUserDto.username,
    });
    if (userExisted) {
      throw new UserAlreadyExistedException(userExisted.username);
    }
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findByLogin({ username, password }: LoginUserDto) {
    const user = await this.userRepository.findByCondition({
      username,
    });

    if (!user) {
      throw new UserNotFoundException(username);
    }

    const is_equal = bcrypt.compareSync(password, user.password);

    if (!is_equal) {
      throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByCondition({
      username,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
