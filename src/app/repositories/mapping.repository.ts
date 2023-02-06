import { CreateMappingDto, MappingDto, MappingScriptDto } from '@app/dtos/mapping.dto'

export abstract class MappingRepository {
  /**
   * Creates a new mapping on database.
   * @param mapping - CreateMapping object.
   * @returns The new mapping created.
   */
  abstract create(mapping: CreateMappingDto): Promise<MappingDto>

  /**
   * List mappings.
   * @returns A list of mappings.
   */
  abstract list(): Promise<MappingDto[]>

  /**
   * Find a mapping by key.
   * @param key - A mapping key.
   * @returns The mapping found.
   */
  abstract findByMappingKey(key: string): Promise<MappingDto>

  /**
   * List mappings scripts.
   * @returns A list of mappings scripts.
   */
  abstract listScripts(): Promise<MappingScriptDto[]>
}
