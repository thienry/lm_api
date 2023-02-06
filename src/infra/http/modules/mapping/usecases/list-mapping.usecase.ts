import { Injectable } from '@nestjs/common'

import { MappingDto } from '@app/dtos/mapping.dto'
import { MappingRepository } from '@app/repositories/mapping.repository'

@Injectable()
export class ListMappingsUseCase {
  constructor(private readonly mappingRepository: MappingRepository) {}

  /**
   * List mappings.
   * @returns A list of mappings.
   */
  async execute(): Promise<MappingDto[]> {
    return this.mappingRepository.list()
  }
}
