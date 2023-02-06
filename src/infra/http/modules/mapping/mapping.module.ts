import { Module } from '@nestjs/common'

import { MappingController } from './mapping.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { CreateMappingUseCase } from './usecases/create-mapping.usecase'

@Module({
  imports: [DatabaseModule],
  controllers: [MappingController],
  providers: [CreateMappingUseCase],
})
export class MappingModule {}
