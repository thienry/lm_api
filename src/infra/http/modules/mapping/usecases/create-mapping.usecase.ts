import { Injectable } from '@nestjs/common'

import { Usecase } from '@app/usecases/usecase.interface'
import { CreateMappingDto, MappingDto } from '@app/dtos/mapping.dto'
import { MappingRepository } from '@app/repositories/mapping.repository'

@Injectable()
export class CreateMappingUseCase implements Usecase<CreateMappingDto, MappingDto> {
  constructor(private readonly mappingRepository: MappingRepository) {}

  /**
   * Performs the creation of a new mapping.
   * @param mapping - Mapping to create.
   * @returns The mapping created.
   */
  async execute(mapping: CreateMappingDto): Promise<MappingDto> {
    return this.mappingRepository.create(mapping)
  }
}
