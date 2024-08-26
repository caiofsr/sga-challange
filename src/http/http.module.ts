import { Module } from '@nestjs/common';
import { AuthModule } from 'src/infra/auth/auth.module';
import { UserController } from './controllers/user.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TutorialController } from './controllers/tutorial.controller';
import { CreateUserUseCase } from 'src/application/use-cases/user/create';
import { CreateTutorialUseCase } from 'src/application/use-cases/tutorial/create';
import { UpdateTutorialUseCase } from 'src/application/use-cases/tutorial/update';
import { DeleteTutorialUseCase } from 'src/application/use-cases/tutorial/delete';
import { GetAllTutorialsUseCase } from 'src/application/use-cases/tutorial/getAll';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TutorialController, UserController],
  providers: [
    CreateUserUseCase,
    CreateTutorialUseCase,
    UpdateTutorialUseCase,
    DeleteTutorialUseCase,
    GetAllTutorialsUseCase,
  ],
})
export class HttpModule {}
