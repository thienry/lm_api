import { Injectable } from '@nestjs/common'

import { AliasDto } from '@app/dtos/alias.dto'
import { AliasRepository } from '@app/repositories/alias.repository'

@Injectable()
export class ListAliasesUseCase {
  constructor(private readonly aliasRepository: AliasRepository) {}

  /**
   * List aliases.
   * @returns A list of aliases.
   */
  async execute(): Promise<AliasDto[]> {
    return this.aliasRepository.list()
  }
}
