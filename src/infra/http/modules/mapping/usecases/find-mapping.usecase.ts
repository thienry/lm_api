import { Injectable } from '@nestjs/common'

import { MappingDto } from '@app/dtos/mapping.dto'
import { MappingRepository } from '@app/repositories/mapping.repository'

@Injectable()
export class FindMappingUseCase {
  constructor(private readonly mappingRepository: MappingRepository) {}

  /**
   * Find a mapping.
   * @param key - A mapping key.
   * @returns The mapping found.
   */
  async execute(key: string): Promise<MappingDto> {
    return this.mappingRepository.findByMappingKey(key)
  }
}
