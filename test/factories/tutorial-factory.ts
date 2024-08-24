import { faker } from '@faker-js/faker';
import { Tutorial, TutorialProps } from 'src/application/entities/tutorial';

type Override = Partial<TutorialProps>;

export function makeTutorial(override: Override = {}) {
  return Tutorial.create({
    id: override.id,
    title: override.title ?? faker.word.words(4),
    createdAt: override.createdAt,
    updatedAt: override.updatedAt,
  });
}

export function makeManyTutorials(count: number) {
  return Array.from({ length: count }, () => makeTutorial());
}
