import { Command, CommandRunner } from 'nest-commander';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../modules/admins/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

@Command({
  name: 'generate:admins',
  description: 'Generate fake admins'
})
export class GenerateAdminsCommand extends CommandRunner {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {
    super();
  }

  async run() {
    // Create main admin
    const mainAdmin = this.adminRepository.create({
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin', 10),
      role: 'super-admin',
      isActive: true,
    });

    await this.adminRepository.save(mainAdmin);
    console.log('Created main admin');

    // Create 10 fake admins
    const fakeAdmins = Array.from({ length: 10 }, () => ({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('password123', 10),
      role: 'admin',
      isActive: true,
    }));

    await this.adminRepository.save(fakeAdmins);
    console.log('Created 10 fake admins');
  }
}
