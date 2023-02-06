import { Injectable } from '@nestjs/common'

import { MappingDto, UpdateMappingDto } from '@app/dtos/mapping.dto'
import { MappingRepository } from '@app/repositories/mapping.repository'

@Injectable()
export class UpdateMappingUseCase {
  constructor(private readonly mappingRepository: MappingRepository) {}

  /**
   * Performs the update of a given mapping.
   * @param key - key of the mapping passed.
   * @param mapping - Mapping to update.
   * @returns The mapping updated.
   */
  async execute(key: string, mapping: UpdateMappingDto): Promise<MappingDto> {
    return this.mappingRepository.update(key, mapping)
  }
}
