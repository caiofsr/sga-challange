import { Tutorial } from '../entities/tutorial';

export type FindAllProps = {
  perPage: string;
  page: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FindAllResponse = {
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

export abstract class TutorialRepository {
  abstract findAll(props: FindAllProps): Promise<FindAllResponse>;
  abstract findById(id: string): Promise<Tutorial | undefined>;
  abstract save(tutorial: Tutorial): Promise<Tutorial>;
  abstract delete(tutorial: Tutorial): Promise<void>;
}
