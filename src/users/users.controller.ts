import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AllowAnonymous } from 'src/core/decorators/anonymous.decorator';
import { ValidationRequestPipe } from 'src/core/pipes/joi-validation.pipe';
import { CreateUserSchema } from './validations-schema/create-user.schema';
import { ProjectionPropertyType } from '../core/database/enums/projection-property-type';
import { ConfigService } from '@nestjs/config';

@Controller({ path: 'users' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @AllowAnonymous()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationRequestPipe(CreateUserSchema)) user: CreateUserDto,
  ): Promise<void> {
    return await this.usersService.create(user);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll({
      password: ProjectionPropertyType.Hide,
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.usersService.get(id, {
      password: ProjectionPropertyType.Hide,
    });
  }
}
