// src/common/schemas/base.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Base extends Document {
  @Prop({ required: true })
  name: string;

  // Other common fields can be added here
}

export const BaseSchema = SchemaFactory.createForClass(Base);

// BaseSchema.pre('save', function (next) {
//   // 'this' refers to the document being saved
//   // Perform operations on the fields
//
//   // For example, manipulating the 'name' field
//   // this.name = this.name.trim();
//
//   next();
// });
