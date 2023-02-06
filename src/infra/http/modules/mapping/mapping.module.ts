import { Module } from '@nestjs/common'

import { MappingController } from './mapping.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { CreateMappingUseCase } from './usecases/create-mapping.usecase'
import {
  FindMappingUseCase,
  ListMappingsScriptsUseCase,
  ListMappingsUseCase,
  UpdateMappingUseCase,
} from './usecases'

@Module({
  imports: [DatabaseModule],
  controllers: [MappingController],
  providers: [
    CreateMappingUseCase,
    FindMappingUseCase,
    ListMappingsUseCase,
    ListMappingsScriptsUseCase,
    UpdateMappingUseCase,
  ],
})
export class MappingModule {}
