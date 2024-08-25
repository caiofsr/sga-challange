import { ApiQueryOptions } from '@nestjs/swagger';

export const manyQueryTutorials: ApiQueryOptions[] = [
  {
    name: 'title',
    type: 'string',
    required: false,
    description: 'Filter by title',
  },
  {
    name: 'createdAt',
    type: 'string',
    required: false,
    example: '2024-08-25T15:09:43.218Z',
    description: 'Filter by createdAt',
  },
  {
    name: 'updatedAt',
    type: 'string',
    required: false,
    example: '2024-08-25T15:09:43.218Z',
    description: 'Filter by updatedAt',
  },
  {
    name: 'perPage',
    type: 'string',
    required: false,
    description: 'Number of tutorials per page',
  },
  {
    name: 'page',
    type: 'string',
    required: false,
    description: 'Page number',
  },
];
