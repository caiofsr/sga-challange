import { Cache } from 'cache-manager';
import { HttpStatus } from '@nestjs/common';
import { GetAllTutorialsUseCase } from './getAll';
import { Tutorial } from 'src/application/entities/tutorial';
import { makeManyTutorials, makeTutorial } from 'test/factories/tutorial-factory';
import { InMemoryTutorialRepository } from 'test/repositories/in-memory-tutorial.repository';

describe('Get All Tutorials', () => {
  let cacheManager: Partial<Cache>;
  let useCase: GetAllTutorialsUseCase;
  let tutorialRepository: InMemoryTutorialRepository;

  let tutorial: Tutorial;

  beforeAll(() => {
    tutorialRepository = new InMemoryTutorialRepository();
    cacheManager = {
      get: jest.fn(),
      set: jest.fn(),
    };
    useCase = new GetAllTutorialsUseCase(tutorialRepository, cacheManager as Cache);

    tutorialRepository.items.push(...makeManyTutorials(4));
    tutorial = makeTutorial({ title: 'Hello World' });
    tutorialRepository.items.push(tutorial);
  });

  it('should get all tutorials with cache', async () => {
    cacheManager.get = jest.fn().mockResolvedValue(tutorialRepository.findAll({ page: '1', perPage: '10' }));
    const { data, status } = await useCase.execute({ page: '1', perPage: '10' });

    expect(status).toBe(HttpStatus.OK);
    expect(data.data).toHaveLength(5);
    expect(data.data).toContain(tutorial);
    expect(data.data[0]).toBeInstanceOf(Tutorial);
    expect(data.meta).toBeDefined();
    expect(data.meta.currentPage).toBe(1);
    expect(data.meta.perPage).toBe(10);
    expect(data.meta.total).toBe(5);
    expect(cacheManager.get).toHaveBeenCalledTimes(1);
    expect(cacheManager.set).not.toHaveBeenCalled();
  });

  it('should get all tutorials without cache', async () => {
    cacheManager.get = jest.fn().mockResolvedValue(undefined);
    const { data, status } = await useCase.execute({ page: '1', perPage: '10' });

    expect(status).toBe(HttpStatus.OK);
    expect(data.data).toHaveLength(5);
    expect(data.data).toContain(tutorial);
    expect(data.data[0]).toBeInstanceOf(Tutorial);
    expect(data.meta).toBeDefined();
    expect(data.meta.currentPage).toBe(1);
    expect(data.meta.perPage).toBe(10);
    expect(data.meta.total).toBe(5);
    expect(cacheManager.get).toHaveBeenCalledTimes(1);
    expect(cacheManager.set).toHaveBeenCalledTimes(1);
  });

  it('should get paginated tutorials with cache', async () => {
    cacheManager.get = jest.fn().mockResolvedValue(tutorialRepository.findAll({ page: '2', perPage: '2' }));
    const { data, status } = await useCase.execute({ page: '2', perPage: '2' });

    expect(status).toBe(HttpStatus.OK);
    expect(data.data).toHaveLength(2);
    expect(data.data[0]).toBeInstanceOf(Tutorial);
    expect(data.meta).toBeDefined();
    expect(data.meta.currentPage).toBe(2);
    expect(data.meta.perPage).toBe(2);
    expect(data.meta.total).toBe(5);
    expect(cacheManager.get).toHaveBeenCalledTimes(1);
    expect(cacheManager.set).not.toHaveBeenCalled();
  });

  it('should get paginated tutorials without cache', async () => {
    cacheManager.get = jest.fn().mockResolvedValue(undefined);
    const { data, status } = await useCase.execute({ page: '2', perPage: '2' });

    expect(status).toBe(HttpStatus.OK);
    expect(data.data).toHaveLength(2);
    expect(data.data[0]).toBeInstanceOf(Tutorial);
    expect(data.meta).toBeDefined();
    expect(data.meta.currentPage).toBe(2);
    expect(data.meta.perPage).toBe(2);
    expect(data.meta.total).toBe(5);
    expect(cacheManager.get).toHaveBeenCalledTimes(1);
    expect(cacheManager.set).toHaveBeenCalledTimes(1);
  });

  it('should get paginated tutorials with search with cache', async () => {
    cacheManager.get = jest
      .fn()
      .mockResolvedValue(tutorialRepository.findAll({ page: '1', perPage: '10', title: 'Hello' }));
    const { data, status } = await useCase.execute({ page: '1', perPage: '10', title: 'Hello' });

    expect(status).toBe(HttpStatus.OK);
    expect(data.data).toHaveLength(1);
    expect(data.data).toContain(tutorial);
    expect(data.data[0]).toBeInstanceOf(Tutorial);
    expect(data.meta).toBeDefined();
    expect(data.meta.currentPage).toBe(1);
    expect(data.meta.perPage).toBe(10);
    expect(data.meta.total).toBe(5);
    expect(cacheManager.get).toHaveBeenCalledTimes(1);
    expect(cacheManager.set).not.toHaveBeenCalled();
  });

  it('should get paginated tutorials with search without cache', async () => {
    cacheManager.get = jest.fn().mockResolvedValue(undefined);
    const { data, status } = await useCase.execute({ page: '1', perPage: '10', title: 'Hello' });

    expect(status).toBe(HttpStatus.OK);
    expect(data.data).toHaveLength(1);
    expect(data.data).toContain(tutorial);
    expect(data.data[0]).toBeInstanceOf(Tutorial);
    expect(data.meta).toBeDefined();
    expect(data.meta.currentPage).toBe(1);
    expect(data.meta.perPage).toBe(10);
    expect(data.meta.total).toBe(5);
    expect(cacheManager.get).toHaveBeenCalledTimes(1);
    expect(cacheManager.set).toHaveBeenCalledTimes(1);
  });
});
