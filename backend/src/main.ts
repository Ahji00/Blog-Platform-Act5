import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // 🔹 Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Blog Platform API')
    .setDescription('API documentation for the Blog Platform')
    .setVersion('1.0')
    .addBearerAuth() // enable JWT auth header in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(4000);
  console.log(`🚀 Server running on http://localhost:${4000}`);
  console.log(`📘 Swagger docs available at http://localhost:${4000}/api`);
}

bootstrap();
