import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { PrismaService } from '../prisma.service'
import { LocaleRepository } from '@app/repositories/locale.repository'
import {
  CreateLocaleDto,
  LocaleDto,
  UpdateLocaleDto,
  UpsertLocaleMappingDto,
} from '@app/dtos/locale.dto'

@Injectable()
export class PrismaLocaleRepository implements LocaleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /** @inheritdoc */
  async create(locale: CreateLocaleDto): Promise<LocaleDto> {
    return this.prismaService.locale.create({
      data: {
        ...locale,
        aliases: { connect: locale.aliases.map(alias => ({ aliasId: alias.aliasId })) },
        mappings: { create: locale.mappings.map(mapping => this.createMappingsInput(mapping)) },
      },
      include: { aliases: true, mappings: true },
    })
  }

  /** @inheritdoc */
  async list(): Promise<LocaleDto[]> {
    return this.prismaService.locale.findMany({ include: { aliases: true, mappings: true } })
  }

  /** @inheritdoc */
  async findByLocaleId(localeId: string): Promise<LocaleDto> {
    return this.prismaService.locale.findFirst({
      where: { localeId: { contains: localeId, mode: 'insensitive' } },
      include: { aliases: true, mappings: true },
    })
  }

  /** @inheritdoc */
  async update(localeId: string, locale: UpdateLocaleDto): Promise<LocaleDto> {
    return this.prismaService.locale.update({
      where: { localeId },
      data: {
        ...locale,
        aliases: {
          connect: locale.aliases.map(alias => ({ aliasId: alias.aliasId })),
          disconnect: await this.getDisconnectAliasOnLocale(locale),
        },
        mappings: {
          connectOrCreate: locale.mappings.map(mapping => ({
            where: { localeId_mappingId: { localeId: locale.localeId, mappingId: mapping.id } },
            create: this.createMappingsInput(mapping),
          })),
          disconnect: await this.getDisconnectMappingsOnLocale(locale),
        },
      },
      include: { aliases: true, mappings: true },
    })
  }

  /** @inheritdoc */
  async delete(id: string): Promise<LocaleDto> {
    return this.prismaService.locale.delete({
      where: { id },
      include: { aliases: true, mappings: true },
    })
  }

  /**
   * Handles the difference of the locales passed to update in the actual alias locales,
   * to disconnect the right locales from alias.
   *
   * @param aliasToUpdate - An alias to update.
   * @returns A list of localeIds with a difference to disconnect the locales on alias.
   */
  private async getDisconnectAliasOnLocale(
    localeToUpdate: UpdateLocaleDto,
  ): Promise<{ aliasId: string }[]> {
    const locale = await this.findByLocaleId(localeToUpdate.localeId)
    if (!locale?.aliases?.length) {
      return []
    }

    const localeAliases = locale.aliases.map(alias => ({ aliasId: alias.aliasId }))
    const aliasesToUpdate = localeToUpdate.aliases.map(alias => ({ aliasId: alias.aliasId }))

    return localeAliases.filter(
      ({ aliasId: item1 }) => !aliasesToUpdate.some(({ aliasId: item2 }) => item2 === item1),
    )
  }

  /**
   * Handles the difference of the locales passed to update in the actual mapping locales,
   * to disconnect the right locales from mappings.
   *
   * @param localesToUpdate - A locale to update.
   * @returns A list of localeId_mappinId with a difference to disconnect the locales on mappings.
   */
  private async getDisconnectMappingsOnLocale(
    localeToUpdate: UpdateLocaleDto,
  ): Promise<{ localeId_mappingId: { localeId: string; mappingId: string } }[]> {
    const locale = await this.findByLocaleId(localeToUpdate.localeId)
    if (!locale?.mappings?.length) {
      return []
    }

    const localeMappings = plainToInstance(
      UpsertLocaleMappingDto,
      locale.mappings.map(mapping => mapping),
    )
    const mappingsToUpdate = localeToUpdate.mappings.map(mapping => mapping)

    const localeMappingsFiltered = localeMappings.filter(
      ({ id: item1 }) => !mappingsToUpdate.some(({ id: item2 }) => item2 === item1),
    )

    return localeMappingsFiltered.map(item => ({
      localeId_mappingId: { localeId: locale.localeId, mappingId: item.id },
    }))
  }

  /**
   * Factory to create Mappings objects to insert in database.
   *
   * @param mapping - A mapping object
   * @returns
   */
  private createMappingsInput(mapping: UpsertLocaleMappingDto) {
    return {
      value: mapping.value,
      mapping: {
        create: {
          key: mapping.key,
          script: mapping.script,
          roleId: mapping.roleId,
          userId: mapping.userId,
        },
      },
    }
  }
}
