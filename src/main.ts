import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin:
        process.env.NODE_ENV === 'production' ? process.env.PROD_ORIGIN : true,
    },
  });
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('Swagger API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
