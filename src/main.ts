import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const port = process.env.PORT || 3000;

  await app.listen(port);
}

function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('ArtGallery API')
    .setDescription('Manage art gallery with this API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

const logger: Logger = new Logger('Main');

bootstrap()
  .then(() => logger.log('Application started'))
  .catch((error) => logger.error(`Application failed to start: ${error}`));
