import { Tutorial } from 'src/application/entities/tutorial';
import { FindAllProps, FindAllResponse, TutorialRepository } from 'src/application/repositories/tutorial.repository';

export class InMemoryTutorialRepository implements TutorialRepository {
  public items: Tutorial[] = [];

  async findAll(props: FindAllProps): Promise<FindAllResponse> {
    const { perPage = '10', page = '1', title, createdAt, updatedAt } = props;

    const tutorials = this.items
      .filter((tutorial) => {
        if (title) {
          return tutorial.title.includes(title);
        }
        return true;
      })
      .filter((tutorial) => {
        if (createdAt) {
          return tutorial.createdAt >= new Date(createdAt);
        }
        return true;
      })
      .filter((tutorial) => {
        if (updatedAt) {
          return tutorial.updatedAt >= new Date(updatedAt);
        }
        return true;
      });

    return {
      data: tutorials.slice(+perPage * (+page - 1), +perPage * +page),
      meta: {
        currentPage: +page,
        lastPage: Math.ceil(this.items.length / +perPage),
        prev: +page > 1 ? +page - 1 : null,
        next: +page < Math.ceil(this.items.length / +perPage) ? +page + 1 : null,
        perPage: +perPage,
        total: this.items.length,
      },
    };
  }

  async findById(id: string): Promise<Tutorial> {
    return this.items.find((item) => item.id === id);
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
