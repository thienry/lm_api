import { Injectable } from '@nestjs/common'

import { MappingRepository } from '@app/repositories/mapping.repository'

@Injectable()
export class ListMappingsScriptsUseCase {
  constructor(private readonly mappingRepository: MappingRepository) {}

  /**
   * List mappings scripts.
   * @returns A list of mappings scripts.
   */
  async execute(): Promise<string[]> {
    const mappings = await this.mappingRepository.listScripts()
    return mappings.map(mapping => mapping.script)
  }
}
