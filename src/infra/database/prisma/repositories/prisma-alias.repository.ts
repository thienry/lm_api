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
}
