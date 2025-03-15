import { Command, CommandRunner } from 'nest-commander';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThreadEntity } from '../modules/threads/entities/thread.entity';
import { MessageEntity } from '../modules/threads/entities/message.entity';
import { UserEntity } from '../modules/users/entities/user.entity';
import { AdminEntity } from '../modules/admins/entities/admin.entity';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

@Command({
  name: 'generate:threads',
  description: 'Generate 1000 threads with random messages'
})
export class GenerateThreadsCommand extends CommandRunner {
  constructor(
    @InjectRepository(ThreadEntity)
    private threadRepository: Repository<ThreadEntity>,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {
    super();
  }

  async run() {
    // Validate users and admins exist
    const usersCount = await this.userRepository.count();
    const adminsCount = await this.adminRepository.count();

    if (usersCount === 0) {
      throw new BadRequestException('No users found. Please run generate:users first');
    }
    if (adminsCount === 0) {
      throw new BadRequestException('No admins found. Please run generate:admins first');
    }

    // Get all users and admins for random assignment
    const users = await this.userRepository.find();
    const admins = await this.adminRepository.find();

    const batchSize = 50;
    const totalThreads = 1000;
    const batches = Math.ceil(totalThreads / batchSize);

    for (let i = 0; i < batches; i++) {
      const threads = await Promise.all(
        Array.from({ length: batchSize }, async () => {
          // Create thread
          const thread = await this.threadRepository.save({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
            author: users[Math.floor(Math.random() * users.length)],
            isApprovedByAdmin: Math.random() > 0.3, // 70% chance of being approved
            approvedBy: admins[Math.floor(Math.random() * admins.length)],
            isActive: true,
          });

          // Create random number of messages (0-1000)
          const messageCount = Math.floor(Math.random() * 1001);
          const messages = Array.from({ length: messageCount }, () => ({
            content: faker.lorem.paragraph(),
            thread,
            author: users[Math.floor(Math.random() * users.length)],
            isActive: true,
          }));

          if (messages.length > 0) {
            await this.messageRepository.save(messages);
          }

          return thread;
        })
      );

      console.log(`Created threads ${i * batchSize + 1} to ${(i + 1) * batchSize}`);
    }

    console.log('Finished creating 1000 threads with random messages');
  }
}
