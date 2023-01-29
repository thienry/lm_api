import { Injectable } from '@nestjs/common'

import { AliasDto } from '@app/dtos/alias.dto'
import { AliasRepository } from '@app/repositories/alias.repository'

@Injectable()
export class FindAliasUseCase {
  constructor(private readonly aliasRepository: AliasRepository) {}

  /**
   * Find an alias.
   * @returns The alias found.
   */
  async execute(aliasId: string): Promise<AliasDto> {
    return this.aliasRepository.findByAliasId(aliasId)
  }
}
