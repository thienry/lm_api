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
    return this.prismaService.mapping.create({ data: mapping })
  }

  /** @inheritdoc */
  async list(): Promise<MappingDto[]> {
    return this.prismaService.mapping.findMany()
  }

  /** @inheritdoc */
  async findByMappingKey(key: string): Promise<MappingDto> {
    return this.prismaService.mapping.findFirst({
      where: { key: { contains: key, mode: 'insensitive' } },
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
      data: { ...mapping },
    })
  }

  /** @inheritdoc */
  async delete(id: string): Promise<MappingDto> {
    return this.prismaService.mapping.delete({ where: { id } })
  }
}
