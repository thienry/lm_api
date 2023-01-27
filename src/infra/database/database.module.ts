import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { PrismaService } from '@infra/database/prisma/prisma.service'
import { PrismaExceptionFilter } from '@infra/database/prisma/prisma-exception.filter'

@Module({
  exports: [PrismaService],
  providers: [PrismaService, { provide: APP_FILTER, useClass: PrismaExceptionFilter }],
})
export class DatabaseModule {}
