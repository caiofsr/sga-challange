import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TutorialController } from './controllers/tutorial.controller';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';
import { UpdateTutorialUseCase } from 'src/application/use-cases/tutorial/update';

@Module({
  imports: [DatabaseModule],
  controllers: [TutorialController],
  providers: [CreateTutorialUseCase, UpdateTutorialUseCase],
})
export class HttpModule {}
