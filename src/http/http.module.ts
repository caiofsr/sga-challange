import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TutorialController } from './controllers/tutorial.controller';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';

@Module({
  imports: [DatabaseModule],
  controllers: [TutorialController],
  providers: [CreateTutorialUseCase],
})
export class HttpModule {}
