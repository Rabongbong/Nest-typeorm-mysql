import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createConnection } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getTest(options: string) {
    try {
      const users: User[] = [];
      for (let i = 1; i <= 1000; i++) {
        const user = new User();
        user.username = `username`;
        user.password = `password`;
        user.name = 'test';
        user.nickname = 'nickname';
        user.email = 'user@example.com';
        users.push(user);
      }
      if (options === 'query') {
        console.time('queryBuilder');
        await this.usersRepository
          .createQueryBuilder('user')
          .insert()
          .into(User)
          .values(users)
          .execute();
        console.timeEnd('queryBuilder');
      } else {
        console.time('basic');
        await this.usersRepository.save(users);
        console.timeEnd('basic');
      }
    } catch (err) {
      console.log(err);
    }
  }
}
