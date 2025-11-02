import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User, post: Post) {
    const { content } = createCommentDto;
    const comment = this.repo.create({ content, user, post });
    return this.repo.save(comment);
  }

  async findAllByPost(postId: number, page = 1, limit = 10) {
    const [items, total] = await this.repo.findAndCount({
      where: { post: { id: postId } },
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
      relations: ['user', 'post'],
    });
    return { items, total, page, limit };
  }

  async findOne(id: number) {
    const comment = await this.repo.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: number, dto: UpdateCommentDto, user: User) {
    const comment = await this.findOne(id);
    if (comment.user.id !== user.id) {
      throw new NotFoundException('Comment not found');
    }
    Object.assign(comment, dto);
    return this.repo.save(comment);
  }

  async remove(id: number, user: User) {
    const comment = await this.findOne(id);
    if (comment.user.id !== user.id) {
      throw new NotFoundException('Comment not found');
    }
    return this.repo.remove(comment);
  }
}
    