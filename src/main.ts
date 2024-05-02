import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.useGlobalFilters(new HttpExceptionFilter())

  if(module.hot) {
    module.hot.accept()
    module.hot.dispose(()=> app.close())
  }
}
bootstrap();
