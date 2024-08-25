import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  const config = new DocumentBuilder().setTitle('Tutorials').setDescription('Tutorials API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2002: { errorMessage: 'This record already exists', statusCode: HttpStatus.UNPROCESSABLE_ENTITY },
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
