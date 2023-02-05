import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { AliasRepository } from '@app/repositories/alias.repository'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { LocaleRepository } from '@app/repositories/locale.repository'
import { PrismaAliasRepository } from './prisma/repositories/prisma-alias.repository'
import { PrismaExceptionFilter } from '@infra/database/prisma/prisma-exception.filter'
import { PrismaLocaleRepository } from './prisma/repositories/prisma-locale.repository'

@Module({
  exports: [PrismaService, AliasRepository, LocaleRepository],
  providers: [
    PrismaService,
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    { provide: AliasRepository, useClass: PrismaAliasRepository },
    { provide: LocaleRepository, useClass: PrismaLocaleRepository },
  ],
})
export class DatabaseModule {}
