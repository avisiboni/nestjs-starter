import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectionPropertyType } from '../core/database/enums/projection-property-type';

@Injectable({})
export class UsersService {
  private users: any[] = [];

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<void> {
    const userEntity: User = {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.userModel.create(userEntity);
  }

  async findAll(projection?: {
    [K in keyof Partial<User>]: ProjectionPropertyType;
  }): Promise<User[]> {
    return await this.userModel.find({}, projection).exec();
  }

  async get(
    id: string,
    projection?: { [K in keyof Partial<User>]: number },
  ): Promise<User | null> {
    if (!id) return null;
    return await this.userModel.findById(id, projection).exec();
  }
}
