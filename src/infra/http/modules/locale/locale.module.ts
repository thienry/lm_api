import { Module } from '@nestjs/common'

import { LocaleController } from './locale.controller'
import { DatabaseModule } from '@infra/database/database.module'
import {
  CreateLocaleUseCase,
  FindLocaleUseCase,
  ListLocalesUseCase,
  UpdateLocaleUseCase,
} from './usecases'

@Module({
  imports: [DatabaseModule],
  controllers: [LocaleController],
  providers: [CreateLocaleUseCase, FindLocaleUseCase, ListLocalesUseCase, UpdateLocaleUseCase],
})
export class LocaleModule {}
