import { Tutorial } from '../entities/tutorial';

export abstract class TutorialRepository {
  abstract findAll(): Promise<Tutorial[]>;
  abstract findById(id: string): Promise<Tutorial | undefined>;
  abstract save(tutorial: Tutorial): Promise<Tutorial>;
  abstract delete(tutorial: Tutorial): Promise<void>;
}
