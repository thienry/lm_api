import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { CreateLocaleDto, LocaleDto } from '@app/dtos/locale.dto'
import { LocaleRepository } from '@app/repositories/locale.repository'

@Injectable()
export class PrismaLocaleRepository implements LocaleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /** @inheritdoc */
  async create(locale: CreateLocaleDto): Promise<LocaleDto> {
    return this.prismaService.locale.create({ data: locale })
  }
}
