import { ForbiddenException, PipeTransform } from '@nestjs/common'
import { ZodError } from 'zod'
import { ZodDtoStatic } from '.'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodDtoStatic) {}

  transform(value: unknown) {
    try {
      return this.schema.zodSchema.parse(value)
    } catch (error: ZodError | unknown) {
      throw new ZodValidateError(error as ZodError)
    }
  }
}

export class ZodValidateError extends ForbiddenException {
  constructor(error: ZodError) {
    super({ message: error.name, error: error.errors })
  }
}
