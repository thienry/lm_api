import { Module } from '@nestjs/common'

import { AliasController } from './alias.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { FindAliasUseCase } from './usecases/find-alias.usecase'
import { ListAliasesUseCase } from './usecases/list-alias.usecase'
import { CreateAliasUseCase } from './usecases/create-alias.usecase'
import { UpdateAliasUseCase } from './usecases/update-alias.usecase'

@Module({
  imports: [DatabaseModule],
  controllers: [AliasController],
  providers: [CreateAliasUseCase, ListAliasesUseCase, FindAliasUseCase, UpdateAliasUseCase],
})
export class AliasModule {}
