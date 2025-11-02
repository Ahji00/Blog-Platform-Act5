import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, user: User) {
    const post = this.repo.create({ ...dto, user });
    return this.repo.save(post);
  }

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
      relations: ['user'],
    });
    return { items, total, page, limit };
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['user', 'comments'],
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, dto: UpdatePostDto, user: User) {
    const post = await this.findOne(id);
    if (post.user.id !== user.id) {
      throw new NotFoundException('Post not found');
    }
    Object.assign(post, dto);
    return this.repo.save(post);
  }

  async remove(id: number, user: User) {
    const post = await this.findOne(id);
    if (post.user.id !== user.id) {
      throw new NotFoundException('Post not found');
    }
    return this.repo.remove(post);
  }
}
