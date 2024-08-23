import { HttpStatus } from '@nestjs/common';
import { UpdateTutorialUseCase } from './update';
import { Tutorial } from 'src/application/entities/tutorial';
import { makeTutorial } from 'test/factories/tutorial-factory';
import { InMemoryTutorialRepository } from 'test/repositories/in-memory-tutorial.repository';

describe('Update Tutorial', () => {
  let useCase: UpdateTutorialUseCase;
  let tutorialRepository: InMemoryTutorialRepository;

  let tutorial: Tutorial;

  beforeAll(() => {
    tutorialRepository = new InMemoryTutorialRepository();
    useCase = new UpdateTutorialUseCase(tutorialRepository);

    tutorial = makeTutorial({
      createdAt: new Date(2023, 1, 1),
      updatedAt: new Date(2023, 1, 1),
    });
    tutorialRepository.items.push(tutorial);
  });

  it('should update a tutorial', async () => {
    const { data, status } = await useCase.execute({
      id: tutorial.id,
      title: 'Hello World',
    });

    expect(data).toBeInstanceOf(Tutorial);
    expect(tutorial.title).toBe('Hello World');
    expect(status).toBe(HttpStatus.OK);
    expect(tutorial.updatedAt).not.toEqual(new Date(2023, 1, 1));
  });

  it('should return erro if tutorial does not exist', async () => {
    jest.spyOn(tutorialRepository, 'save');

    const { status, data } = await useCase.execute({
      id: 'invalid-id',
      title: 'Hello World',
    });

    expect(status).toBe(HttpStatus.NOT_FOUND);
    expect(data).toEqual({ message: 'Tutorial not found' });

    expect(tutorialRepository.save).not.toHaveBeenCalled();
  });
});
