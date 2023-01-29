import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { AliasRepository } from '@app/repositories/alias.repository'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { PrismaAliasRepository } from './prisma/repositories/prisma-alias.repository'
import { PrismaExceptionFilter } from '@infra/database/prisma/prisma-exception.filter'

@Module({
  exports: [PrismaService, AliasRepository],
  providers: [
    PrismaService,
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    { provide: AliasRepository, useClass: PrismaAliasRepository },
  ],
})
export class DatabaseModule {}
