import { Module } from '@nestjs/common'

import { LocaleController } from './locale.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { CreateLocaleUseCase, FindLocaleUseCase, ListLocalesUseCase } from './usecases'

@Module({
  imports: [DatabaseModule],
  controllers: [LocaleController],
  providers: [CreateLocaleUseCase, FindLocaleUseCase, ListLocalesUseCase],
})
export class LocaleModule {}
