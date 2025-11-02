import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(username: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.repo.create({ username, email, password: hashedPassword });
    return this.repo.save(user);
  }

  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['posts', 'comments'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOne(id: number): Promise<User> {
    return this.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username } });
  }

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
      relations: ['posts', 'comments'],
      select: ['id', 'username', 'email'], // exclude password
    });
    return { items, total, page, limit };
  }

  async remove(id: number) {
    const user = await this.findById(id);
    return this.repo.remove(user);
  }
}
