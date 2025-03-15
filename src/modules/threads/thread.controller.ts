import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadEntity } from './entities/thread.entity';

@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Get()
  findAll() {
    return this.threadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() threadData: Partial<ThreadEntity>) {
    return this.threadService.create(threadData);
  }

  @Put(':id/approve')
  approve(@Param('id') id: string, @Body('adminId') adminId: string) {
    // Note: You'll want to get the admin from the request context in a real app
    return this.threadService.approve(id, { id: adminId } as any);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() threadData: Partial<ThreadEntity>) {
    return this.threadService.update(id, threadData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.threadService.delete(id);
  }
}
