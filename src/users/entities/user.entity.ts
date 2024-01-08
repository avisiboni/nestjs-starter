import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../core/database/middlwares/base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ instance: 'ObjectID' })
  readonly id?: string;
  @Prop({ required: true })
  readonly name: string;
  @Prop({ required: true, unique: true })
  readonly email: string;
  @Prop({ required: true })
  readonly password: string;
  @Prop({ type: Date })
  readonly createdAt: Date;
  @Prop({ type: Date })
  readonly updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
