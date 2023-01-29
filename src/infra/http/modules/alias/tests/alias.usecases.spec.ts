import { Test, TestingModule } from '@nestjs/testing'

import { AliasController } from '../alias.controller'
import { AliasDto, CreateAliasDto } from '@app/dtos/alias.dto'
import { DatabaseModule } from '@infra/database/database.module'
import { createAliasInput, findAliasByAliasID } from './alias.mock'
import { CreateAliasUseCase } from '../usecases/create-alias.usecase'
import { PrismaService } from '@infra/database/prisma/prisma.service'

let alias: AliasDto
let prisma: PrismaService
let createAliasUseCase: CreateAliasUseCase

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [DatabaseModule],
    controllers: [AliasController],
    providers: [CreateAliasUseCase],
  }).compile()

  prisma = moduleFixture.get(PrismaService)
  createAliasUseCase = moduleFixture.get(CreateAliasUseCase)
})

afterAll(async () => {
  await prisma.alias.delete({ where: { id: alias.id } })
  await prisma.$disconnect()
})

describe('CreateAliasUseCase unit tests', () => {
  it('should create a new alias', async () => {
    alias = await createAliasUseCase.execute(createAliasInput)
    const createdAlias = await findAliasByAliasID(alias.aliasId)

    expect(alias).toEqual(createdAlias)
  })

  it('should not create a new alias', async () => {
    expect(createAliasUseCase.execute({} as CreateAliasDto)).rejects.toThrow()
  })
})
