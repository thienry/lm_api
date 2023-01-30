import { Module } from '@nestjs/common'

import { AliasController } from './alias.controller'
import { DatabaseModule } from '@infra/database/database.module'
import {
  FindAliasUseCase,
  CreateAliasUseCase,
  DeleteAliasUseCase,
  ListAliasesUseCase,
  UpdateAliasUseCase,
} from './usecases'

@Module({
  imports: [DatabaseModule],
  controllers: [AliasController],
  providers: [
    FindAliasUseCase,
    CreateAliasUseCase,
    ListAliasesUseCase,
    UpdateAliasUseCase,
    DeleteAliasUseCase,
  ],
})
export class AliasModule {}
