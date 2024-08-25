import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export const ApiManyQuery = (query: ApiQueryOptions[]) => {
  return applyDecorators(...query.map((q) => ApiQuery(q)));
};
