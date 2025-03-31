import { Command, CommandRunner } from 'nest-commander';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../modules/admins/entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Command({
  name: 'fix:admins',
  description: 'Reset all admin passwords to 123321',
})
export class FixAdminsCommand extends CommandRunner {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {
    super();
  }

  async run() {
    const password = '123321';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get all admins and update their passwords
    const admins = await this.adminRepository.find();
    for (const admin of admins) {
      admin.password = hashedPassword;
    }
    await this.adminRepository.save(admins);
  }
}
