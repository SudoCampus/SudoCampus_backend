import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 정의되지 않은 속성은 거른다.
      forbidNonWhitelisted: true, // dto에 정의되지 않은 속성이 있으면 요청 자체를 막는다.
      transform: true, // 요청에서 넘어온 자료들의 형변환을 자동으로 해준다. ex) id: string -> id: number
    }),
  );
  await app.listen(8000);
}
bootstrap();
