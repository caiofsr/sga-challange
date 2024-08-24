import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TutorialController } from './controllers/tutorial.controller';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';
import { UpdateTutorialUseCase } from 'src/application/use-cases/tutorial/update';
import { DeleteTutorialUseCase } from 'src/application/use-cases/tutorial/delete';
import { GetAllTutorialsUseCase } from 'src/application/use-cases/tutorial/getAll';

@Module({
  imports: [DatabaseModule],
  controllers: [TutorialController],
  providers: [CreateTutorialUseCase, UpdateTutorialUseCase, DeleteTutorialUseCase, GetAllTutorialsUseCase],
})
export class HttpModule {}
