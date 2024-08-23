import { Injectable } from '@nestjs/common';
import { Tutorial } from 'src/application/entities/tutorial';
import { TutorialRepository } from 'src/application/repositories/tutorial.repository';

@Injectable()
export class CreateTutorialUseCase {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  async execute({ title }: { title: string }) {
    const tutorial = Tutorial.create({ title });

    return await this.tutorialRepository.save(tutorial);
  }
}
