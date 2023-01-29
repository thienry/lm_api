import { AliasDto, CreateAliasDto } from '@app/dtos/alias.dto'

export abstract class AliasRepository {
  /**
   * Creates a new alias on database.
   * @params CreateAlias object.
   * @returns The new alias created.
   */
  abstract create(alias: CreateAliasDto): Promise<AliasDto>
}
