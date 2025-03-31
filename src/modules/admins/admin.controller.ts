import { Controller, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminEntity } from './entities/admin.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BaseController } from '../../controllers/base.controller';

@UseGuards(JwtAuthGuard)
@Controller('admins')
export class AdminController extends BaseController<AdminEntity> {
  constructor(private readonly adminService: AdminService) {
    super(adminService);
  }
}
