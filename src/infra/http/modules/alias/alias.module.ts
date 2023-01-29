import { Module } from '@nestjs/common'

import { AliasController } from './alias.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { CreateAliasUseCase } from './usecases/create-alias.usecase'

@Module({
  imports: [DatabaseModule],
  controllers: [AliasController],
  providers: [CreateAliasUseCase],
})
export class AliasModule {}
