import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { LoggerMiddleware } from '@infra/http/middlewares/logger.middleware'

@Module({})
export class HttpModule implements NestModule {
  /** @inheritdoc */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
