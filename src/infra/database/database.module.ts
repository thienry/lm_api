import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { AliasRepository } from '@app/repositories/alias.repository'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { LocaleRepository } from '@app/repositories/locale.repository'
import { MappingRepository } from '@app/repositories/mapping.repository'
import { PrismaAliasRepository } from './prisma/repositories/prisma-alias.repository'
import { PrismaExceptionFilter } from '@infra/database/prisma/prisma-exception.filter'
import { PrismaLocaleRepository } from './prisma/repositories/prisma-locale.repository'
import { PrismaMappingRepository } from './prisma/repositories/prisma-mapping.repository'

@Module({
  exports: [PrismaService, AliasRepository, LocaleRepository, MappingRepository],
  providers: [
    PrismaService,
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    { provide: AliasRepository, useClass: PrismaAliasRepository },
    { provide: LocaleRepository, useClass: PrismaLocaleRepository },
    { provide: MappingRepository, useClass: PrismaMappingRepository },
  ],
})
export class DatabaseModule {}
