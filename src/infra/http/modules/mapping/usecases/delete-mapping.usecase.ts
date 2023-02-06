import { Injectable } from '@nestjs/common'

import { MappingDto } from '@app/dtos/mapping.dto'
import { MappingRepository } from '@app/repositories/mapping.repository'

@Injectable()
export class DeleteMappingUseCase {
  constructor(private readonly mappingRepository: MappingRepository) {}

  /**
   * Performs the deletion of a given mapping.
   * @param id - ID of the mapping passed.
   * @returns The mapping deleted.
   */
  async execute(id: string): Promise<MappingDto> {
    return this.mappingRepository.delete(id)
  }
}
