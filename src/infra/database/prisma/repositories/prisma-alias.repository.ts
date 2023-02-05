import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { CreateAliasDto, AliasDto } from '@app/dtos/alias.dto'
import { AliasRepository } from '@app/repositories/alias.repository'

@Injectable()
export class PrismaAliasRepository implements AliasRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /** @inheritdoc */
  async create(alias: CreateAliasDto): Promise<AliasDto> {
    return this.prismaService.alias.create({
      data: {
        ...alias,
        locales: { connect: alias?.locales?.map(locale => ({ localeId: locale.localeId })) },
      },
      include: { locales: true },
    })
  }

  /** @inheritdoc */
  async list(): Promise<AliasDto[]> {
    return this.prismaService.alias.findMany({ include: { locales: true } })
  }

  /** @inheritdoc */
  async findByAliasId(aliasId: string): Promise<AliasDto> {
    return this.prismaService.alias.findFirst({
      where: { aliasId: { contains: aliasId, mode: 'insensitive' } },
      include: { locales: true },
    })
  }

  /** @inheritdoc */
  async update(aliasId: string, alias: AliasDto): Promise<AliasDto> {
    return this.prismaService.alias.update({
      data: {
        ...alias,
        locales: {
          connect: alias?.locales?.map(locale => ({ localeId: locale.localeId })),
          disconnect: await this.getDisconnectLocaleOnAlias(alias),
        },
      },
      where: { aliasId },
      include: { locales: true },
    })
  }

  /** @inheritdoc */
  async delete(id: string): Promise<AliasDto> {
    return this.prismaService.alias.delete({ where: { id }, include: { locales: true } })
  }

  /**
   * Handles the difference of the locales passed to update in the actual alias locales,
   * to disconnect the right locales from alias.
   * @param aliasToUpdate - An alias to update
   * @returns A list of localeIds with a difference to disconnect the locales on alias.
   */
  private async getDisconnectLocaleOnAlias(
    aliasToUpdate: AliasDto,
  ): Promise<{ localeId: string }[]> {
    const alias = await this.findByAliasId(aliasToUpdate.aliasId)

    if (!alias?.locales?.length) {
      return []
    }

    const aliasLocales = alias.locales.map(locale => ({ localeId: locale.localeId }))
    const localesToUpdate = aliasToUpdate.locales.map(locale => ({ localeId: locale.localeId }))

    return aliasLocales.filter(
      ({ localeId: item1 }) => !localesToUpdate.some(({ localeId: item2 }) => item2 === item1),
    )
  }
}
