import { ArgumentMetadata, Logger, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
// import { CustomException } from '../exception/custom-exception.exception';
// import { ExceptionType } from '../exception/exception-types.enum';

export class ValidationRequestPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }

  transform(value: any, metadata?: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { stripUnknown: true });
    if (error) {
      // throw new CustomException(
      //   ExceptionType.BadArgument,
      //   `Validation error occurred while validating ${error}`,
      //   'Please check your data',
      // );
      
      Logger.error(`Validation error occurred while validating payload`, error);
    }
    return value;
  }
}
