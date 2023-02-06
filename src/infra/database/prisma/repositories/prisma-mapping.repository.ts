import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { CreateMappingDto, MappingDto } from '@app/dtos/mapping.dto'
import { MappingRepository } from '@app/repositories/mapping.repository'

@Injectable()
export class PrismaMappingRepository implements MappingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /** @inheritdoc */
  async create(mapping: CreateMappingDto): Promise<MappingDto> {
    return this.prismaService.mapping.create({ data: mapping })
  }
}
