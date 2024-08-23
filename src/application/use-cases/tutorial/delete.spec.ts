import { HttpStatus } from '@nestjs/common';
import { DeleteTutorialUseCase } from './delete';
import { Tutorial } from 'src/application/entities/tutorial';
import { makeTutorial } from 'test/factories/tutorial-factory';
import { InMemoryTutorialRepository } from 'test/repositories/in-memory-tutorial.repository';

describe('Delete Tutorial', () => {
  let useCase: DeleteTutorialUseCase;
  let tutorialRepository: InMemoryTutorialRepository;

  let tutorial: Tutorial;

  beforeAll(() => {
    tutorialRepository = new InMemoryTutorialRepository();
    useCase = new DeleteTutorialUseCase(tutorialRepository);

    tutorial = makeTutorial();
    tutorialRepository.items.push(tutorial);
  });

  it('should delete a tutorial', async () => {
    const { data, status } = await useCase.execute({ id: tutorial.id });

    expect(data).toBeUndefined();
    expect(status).toBe(HttpStatus.NO_CONTENT);
    expect(tutorialRepository.items).toHaveLength(0);
  });

  it('should return error if tutorial does not exist', async () => {
    jest.spyOn(tutorialRepository, 'delete');

    const { status, data } = await useCase.execute({
      id: 'invalid-id',
    });

    expect(status).toBe(HttpStatus.NOT_FOUND);
    expect(data).toEqual({ message: 'Tutorial not found' });
    expect(tutorialRepository.delete).not.toHaveBeenCalled();
  });
});
