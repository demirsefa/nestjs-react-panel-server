import { Command, CommandRunner } from 'nest-commander';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

@Command({
  name: 'generate:users',
  description: 'Generate 1000 fake users'
})
export class GenerateUsersCommand extends CommandRunner {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async run() {
    const batchSize = 100; // Insert in batches to avoid memory issues
    const totalUsers = 1000;
    const batches = Math.ceil(totalUsers / batchSize);

    for (let i = 0; i < batches; i++) {
      const users = Array.from({ length: batchSize }, () => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password123', 10),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        isActive: true,
      }));

      await this.userRepository.save(users);
      console.log(`Created users ${i * batchSize + 1} to ${(i + 1) * batchSize}`);
    }

    console.log('Finished creating 1000 users');
  }
}
