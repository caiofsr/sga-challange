import { PrismaService } from 'nestjs-prisma';
import { Prisma, Tutorial } from '@prisma/client';

// Define a union type of all model names available in Prisma
export type ModelNames = (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName];

// Define a type for Prisma operations specific to a given model
type PrismaOperations<ModelName extends ModelNames> = Prisma.TypeMap['model'][ModelName]['operations'];

// Define a type for Prisma findMany arguments specific to a given model
type PrismaFindManyArgs<ModelName extends ModelNames> = PrismaOperations<ModelName>['findMany']['args'];

// Define a type for pagination options, including model name, query filters, and pagination parameters
type PaginationOptions<ModelName extends ModelNames> = {
  modelName: ModelName; // Name of the model to paginate
  where?: PrismaFindManyArgs<ModelName>['where']; // Filtering conditions for the query
  orderBy?: PrismaFindManyArgs<ModelName>['orderBy']; // Sorting criteria for the query
  page?: string; // Page number for pagination
  perPage?: string; // Number of items per page for pagination
};

export type PrismaPaginatedResponse = {
  data: Tutorial[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
};

export async function paginate<ModelName extends ModelNames>(
  prismaService: PrismaService,
  { page, perPage, modelName, where, orderBy }: PaginationOptions<ModelName>,
): Promise<PrismaPaginatedResponse> {
  const db = prismaService[modelName as string];

  const skip = (+page - 1) * +perPage;

  const totalCount = await db.count();

  const items = await db.findMany({
    where,
    orderBy,
    skip,
    take: +perPage,
  });

  return {
    data: items,
    meta: {
      total: totalCount,
      lastPage: Math.ceil(totalCount / +perPage),
      currentPage: +page,
      perPage: +perPage,
      prev: +page > 1 ? +page - 1 : null,
      next: +page < Math.ceil(totalCount / +perPage) ? +page + 1 : null,
    },
  };
}
