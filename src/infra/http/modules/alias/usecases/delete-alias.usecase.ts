import { Injectable } from '@nestjs/common'

import { AliasDto } from '@app/dtos/alias.dto'
import { AliasRepository } from '@app/repositories/alias.repository'

@Injectable()
export class DeleteAliasUseCase {
  constructor(private readonly aliasRepository: AliasRepository) {}

  /**
   * Performs the deletion of a given alias.
   * @param aliasId AliasId of the alias passed.
   * @returns The alias deleted.
   */
  async execute(aliasId: string): Promise<AliasDto> {
    return this.aliasRepository.delete(aliasId)
  }
}
