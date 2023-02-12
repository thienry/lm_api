import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { MappingRepository } from '@app/repositories/mapping.repository'
import {
  CreateMappingDto,
  MappingDto,
  MappingScriptDto,
  UpdateMappingDto,
} from '@app/dtos/mapping.dto'

@Injectable()
export class PrismaMappingRepository implements MappingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /** @inheritdoc */
  async create(mapping: CreateMappingDto): Promise<MappingDto> {
    return this.prismaService.mapping.create({
      data: {
        ...mapping,
        locales: {
          create: mapping.locales.map(locale => ({
            value: mapping.value,
            localeId: locale.localeId,
          })),
        },
      },
      include: { locales: true },
    })
  }

  /** @inheritdoc */
  async list(): Promise<MappingDto[]> {
    return this.prismaService.mapping.findMany({ include: { locales: true } })
  }

  /** @inheritdoc */
  async findByMappingKey(key: string): Promise<MappingDto> {
    return this.prismaService.mapping.findFirst({
      where: { key: { contains: key, mode: 'insensitive' } },
      include: { locales: true },
    })
  }

  /** @inheritdoc */
  async listScripts(): Promise<MappingScriptDto[]> {
    return this.prismaService.mapping.findMany({ distinct: ['script'], select: { script: true } })
  }

  /** @inheritdoc */
  async update(key: string, mapping: UpdateMappingDto): Promise<MappingDto> {
    return this.prismaService.mapping.update({
      where: { key },
      data: {
        ...mapping,
        locales: {
          create: mapping.locales.map(locale => ({
            value: mapping.value,
            localeId: locale.localeId,
          })),
          disconnect: await this.getDisconnectLocalesOnMapping(mapping),
        },
      },
      include: { locales: true },
    })
  }

  /** @inheritdoc */
  async delete(id: string): Promise<MappingDto> {
    return this.prismaService.mapping.delete({ where: { id }, include: { locales: true } })
  }

  /**
   * Handles the difference of the locales passed to update in the actual mapping locales,
   * to disconnect the right locales from mappings.
   *
   * @param mappingToUpdate - A mapping to update.
   * @returns A list of localeId_mappingId with a difference to disconnect the locales on mappings.
   */
  private async getDisconnectLocalesOnMapping(
    mappingToUpdate: UpdateMappingDto,
  ): Promise<{ localeId_mappingId: { localeId: string; mappingId: string } }[]> {
    const mapping = await this.findByMappingKey(mappingToUpdate.key)
    if (!mapping.locales.length) {
      return []
    }

    const localeMappings = mapping.locales.map(locale => locale)
    const localesToUpdate = mappingToUpdate.locales.map(locale => locale)

    const localeMappingsFiltered = localeMappings.filter(
      ({ localeId: item1 }) => !localesToUpdate.some(({ localeId: item2 }) => item2 === item1),
    )

    return localeMappingsFiltered.map(item => ({
      localeId_mappingId: { localeId: item.localeId, mappingId: mapping.id },
    }))
  }
}
