import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { CreateAliasDto, AliasDto } from '@app/dtos/alias.dto'
import { AliasRepository } from '@app/repositories/alias.repository'

@Injectable()
export class PrismaAliasRepository implements AliasRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /** @inheritdoc */
  async create(alias: CreateAliasDto): Promise<AliasDto> {
    return this.prismaService.alias.create({ data: alias })
  }

  /** @inheritdoc */
  async list(): Promise<AliasDto[]> {
    return this.prismaService.alias.findMany()
  }

  /** @inheritdoc */
  async findByAliasId(aliasId: string): Promise<AliasDto> {
    return this.prismaService.alias.findFirst({
      where: { aliasId: { equals: aliasId, mode: 'insensitive' } },
    })
  }

  /** @inheritdoc */
  async update(aliasId: string, alias: AliasDto): Promise<AliasDto> {
    return this.prismaService.alias.update({ data: alias, where: { aliasId } })
  }

  /** @inheritdoc */
  async delete(id: string): Promise<AliasDto> {
    return this.prismaService.alias.delete({ where: { id } })
  }
}
