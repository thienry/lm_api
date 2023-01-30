import { AliasDto, CreateAliasDto, UpdateAliasDto } from '@app/dtos/alias.dto'

export abstract class AliasRepository {
  /**
   * Creates a new alias on database.
   * @param alias CreateAlias object.
   * @returns The new alias created.
   */
  abstract create(alias: CreateAliasDto): Promise<AliasDto>

  /**
   * List aliases.
   * @returns A list of aliases.
   */
  abstract list(): Promise<AliasDto[]>

  /**
   * Find an alias by aliasID.
   * @param aliasId An aliasID.
   * @returns The alias found.
   */
  abstract findByAliasId(aliasId: string): Promise<AliasDto>

  /**
   * Update an alias by aliasID.
   * @param aliasId An aliasID.
   * @returns The alias updated.
   */
  abstract update(aliasId: string, alias: UpdateAliasDto): Promise<AliasDto>

  /**
   * Delete an alias by aliasID.
   * @param id An ID.
   * @returns The alias deleted.
   */
  abstract delete(id: string): Promise<AliasDto>
}
