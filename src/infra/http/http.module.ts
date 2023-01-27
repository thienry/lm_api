import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { LoggerMiddleware } from '@infra/http/middlewares/logger.middleware'

@Module({ controllers: [AppController], providers: [AppService] })
// implements NestModule
export class HttpModule {
  /** @inheritdoc */
  //configure(consumer: MiddlewareConsumer) {
  //  consumer.apply(LoggerMiddleware).forRoutes('*')
  // }
}
