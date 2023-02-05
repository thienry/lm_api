import { Module } from '@nestjs/common'

import { LocaleController } from './locale.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { CreateLocaleUseCase } from './usercases/create-locale.usecase'

@Module({
  imports: [DatabaseModule],
  controllers: [LocaleController],
  providers: [CreateLocaleUseCase],
})
export class LocaleModule {}
