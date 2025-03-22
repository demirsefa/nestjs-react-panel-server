import {
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BaseService } from '../providers/base.service';
import { BaseEntity } from '../entities/base.entity';
import { DeepPartial } from 'typeorm';

export class BaseController<T extends BaseEntity> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    return this.baseService.findAll({ skip, limit });
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<T> {
    const item = await this.baseService.findOne(id);
    if (item === null) {
      throw new NotFoundException('Not Found');
    }
    return item;
  }

  @Post()
  async create(@Body() data: DeepPartial<T>): Promise<T> {
    return this.baseService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: DeepPartial<T>,
  ): Promise<T> {
    return this.baseService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.baseService.delete(id);
  }
}
