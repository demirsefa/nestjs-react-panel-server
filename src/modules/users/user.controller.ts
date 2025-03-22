import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from '../../controllers/base.controller';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController extends BaseController<UserEntity> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
