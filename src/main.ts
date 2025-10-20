import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getPort } from 'get-port-please';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: isProd ? process.env.PROD_ORIGIN : true,
    },
  });
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('Swagger API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const defaultPort = 3000;
  const port = isProd
    ? Number(process.env.PORT ?? defaultPort)
    : await getPort({
        ports: [
          process.env.PORT && Number(process.env.PORT),
          defaultPort,
          3001,
          3002,
          3003,
        ],
      });

  await app.listen(port, '0.0.0.0', () =>
    console.log(
      `🚀 Application is running on http://localhost:${port} (${isProd ? 'prod' : 'dev'})`,
    ),
  );
}
bootstrap();
