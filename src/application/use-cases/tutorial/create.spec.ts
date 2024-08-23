import { HttpStatus } from '@nestjs/common';
import { CreateTutorialUseCase } from './create';
import { Tutorial } from 'src/application/entities/tutorial';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';
import { InMemoryTutorialRepository } from 'test/repositories/in-memory-tutorial.repository';

describe('Create Tutorial', () => {
  let useCase: CreateTutorialUseCase;
  let tutorialRepository: TutorialRepository;

  beforeAll(() => {
    tutorialRepository = new InMemoryTutorialRepository();
    useCase = new CreateTutorialUseCase(tutorialRepository);
  });

  it('should create a new tutorial', async () => {
    const { status, data: tutorial } = await useCase.execute({ title: 'Hello World' });

    expect(status).toBe(HttpStatus.CREATED);
    expect(tutorial).toBeInstanceOf(Tutorial);
    expect(tutorial.id).toBeTruthy();
    expect(tutorial.title).toBe('Hello World');
    expect(tutorial.createdAt).toBeInstanceOf(Date);
    expect(tutorial.updatedAt).toBeInstanceOf(Date);
  });
});
