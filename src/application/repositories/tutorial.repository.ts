import { Tutorial } from '../entities/tutorial';

export abstract class TutorialRepository {
  abstract findAll(): Promise<Tutorial[]>;
  abstract save(tutorial: Tutorial): Promise<Tutorial>;
  abstract delete(tutorial: Tutorial): Promise<void>;
}
