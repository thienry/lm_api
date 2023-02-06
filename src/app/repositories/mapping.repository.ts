import { CreateMappingDto, MappingDto } from '@app/dtos/mapping.dto'

export abstract class MappingRepository {
  /**
   * Creates a new mapping on database.
   * @param mapping - CreateMapping object.
   * @returns The new mapping created.
   */
  abstract create(mapping: CreateMappingDto): Promise<MappingDto>
}
