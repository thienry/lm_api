import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { AliasModule } from './modules/alias/alias.module'
import { LoggerMiddleware } from '@infra/http/middlewares/logger.middleware'

@Module({ controllers: [AppController], providers: [AppService], imports: [AliasModule] })
// implements NestModule
export class HttpModule {
  /** @inheritdoc */
  //configure(consumer: MiddlewareConsumer) {
  //  consumer.apply(LoggerMiddleware).forRoutes('*')
  // }
}
