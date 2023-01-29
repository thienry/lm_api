import { Injectable } from '@nestjs/common'

import { Usecase } from '@app/usecases/usecase.interface'
import { AliasDto, CreateAliasDto } from '@app/dtos/alias.dto'
import { AliasRepository } from '@app/repositories/alias.repository'

@Injectable()
export class CreateAliasUseCase implements Usecase<CreateAliasDto, AliasDto> {
  constructor(private readonly aliasRepository: AliasRepository) {}

  /**
   * Performs the creation of a new alias.
   * @param alias - Alias to create.
   * @returns The alias created.
   */
  async execute(alias: CreateAliasDto): Promise<AliasDto> {
    return this.aliasRepository.create(alias)
  }
}
