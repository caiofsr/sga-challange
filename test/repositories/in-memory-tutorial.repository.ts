import { Tutorial } from 'src/application/entities/tutorial';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';

export class InMemoryTutorialRepository implements TutorialRepository {
  public items: Tutorial[] = [];

  async findAll(): Promise<Tutorial[]> {
    return this.items;
  }

  async save(tutorial: Tutorial): Promise<Tutorial> {
    const index = this.items.findIndex((item) => item.id === tutorial.id);

    if (!index) {
      this.items.push(tutorial);

      return tutorial;
    }

    this.items[index] = tutorial;

    return tutorial;
  }

  async delete(tutorial: Tutorial): Promise<void> {
    const index = this.items.findIndex((item) => item.id === tutorial.id);

    this.items.splice(index, 1);

    return;
  }
}
