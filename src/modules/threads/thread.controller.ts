import { Controller, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadEntity } from './entities/thread.entity';
import { BaseController } from '../../controllers/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('threads')
export class ThreadController extends BaseController<ThreadEntity> {
  constructor(private readonly threadService: ThreadService) {
    super(threadService);
  }

  @Put(':id/approve')
  approve(@Param('id') id: string, @Body('adminId') adminId: string) {
    // Note: You'll want to get the admin from the request context in a real app
    return this.threadService.approve(id, { id: adminId } as any);
  }
}
