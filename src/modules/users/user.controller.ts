import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from '../../controllers/base.controller';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController extends BaseController<UserEntity> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
