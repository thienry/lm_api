import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { MainModule } from './main.module'
import { PrismaExceptionFilter } from '@infra/database/prisma/prisma-exception.filter'

const BASE_PATH = 'locale-mapper-api'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)
  //app.enableCors()
  app.setGlobalPrefix(BASE_PATH)
  //app.useGlobalFilters(new PrismaExceptionFilter())
  //app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Locale Mapper API')
    .setDescription('')
    .setVersion('0.0.1-alpha')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(BASE_PATH, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  })

  await app.listen(3000)
}

bootstrap()
