import { Injectable } from '@nestjs/common'

import { AliasDto, UpdateAliasDto } from '@app/dtos/alias.dto'
import { AliasRepository } from '@app/repositories/alias.repository'

@Injectable()
export class UpdateAliasUseCase {
  constructor(private readonly aliasRepository: AliasRepository) {}

  /**
   * Performs the update of a given alias.
   * @param aliasId AliasId of the alias passed.
   * @param alias Alias to update.
   * @returns The alias updated.
   */
  async execute(aliasId: string, alias: UpdateAliasDto): Promise<AliasDto> {
    return this.aliasRepository.update(aliasId, alias)
  }
}
