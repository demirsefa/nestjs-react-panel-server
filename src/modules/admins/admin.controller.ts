import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminEntity } from './entities/admin.entity';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Post()
  create(@Body() adminData: Partial<AdminEntity>) {
    return this.adminService.create(adminData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() adminData: Partial<AdminEntity>) {
    return this.adminService.update(id, adminData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
