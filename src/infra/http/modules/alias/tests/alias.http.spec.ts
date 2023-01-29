import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { createAliasInput } from './alias.mock'
import { AliasController } from '../alias.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { CreateAliasUseCase } from '../usecases/create-alias.usecase'

let app: INestApplication
let prisma: PrismaService

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [DatabaseModule],
    controllers: [AliasController],
    providers: [CreateAliasUseCase],
  }).compile()

  prisma = moduleFixture.get(PrismaService)
  app = moduleFixture.createNestApplication()
  await app.init()
})

afterAll(async () => await prisma.$disconnect())

describe('Create Alias', () => {
  it('should create an alias', async () => {
    const response = await request(app.getHttpServer())
      .post('/aliases')
      .send(createAliasInput)
      .expect(201)

    expect(response.body.id).toBeDefined()
    expect(response.body).toEqual(
      expect.objectContaining({
        aliasId: createAliasInput.aliasId,
        description: createAliasInput.description,
        extraInfo: createAliasInput.extraInfo,
        isRestricted: createAliasInput.isRestricted,
        userId: createAliasInput.userId,
      }),
    )

    await prisma.alias.delete({ where: { id: response.body.id } })
  })
})
