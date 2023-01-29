import { Test, TestingModule } from '@nestjs/testing'

import { AliasController } from '../alias.controller'
import { AliasDto, CreateAliasDto } from '@app/dtos/alias.dto'
import { DatabaseModule } from '@infra/database/database.module'
import { FindAliasUseCase } from '../usecases/find-alias.usecase'
import { ListAliasesUseCase } from '../usecases/list-alias.usecase'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { CreateAliasUseCase } from '../usecases/create-alias.usecase'
import { UpdateAliasUseCase } from '../usecases/update-alias.usecase'
import { createAliasInput, findAliasByAliasID, listAliases, updateAliasInput } from './alias.mock'

let alias: AliasDto
let prisma: PrismaService
let findAliasUseCase: FindAliasUseCase
let createAliasUseCase: CreateAliasUseCase
let listAliasesUseCase: ListAliasesUseCase
let updateAliasUseCase: UpdateAliasUseCase

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [DatabaseModule],
    controllers: [AliasController],
    providers: [CreateAliasUseCase, ListAliasesUseCase, FindAliasUseCase, UpdateAliasUseCase],
  }).compile()

  prisma = moduleFixture.get(PrismaService)
  findAliasUseCase = moduleFixture.get(FindAliasUseCase)
  createAliasUseCase = moduleFixture.get(CreateAliasUseCase)
  listAliasesUseCase = moduleFixture.get(ListAliasesUseCase)
  updateAliasUseCase = moduleFixture.get(UpdateAliasUseCase)
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

describe('ListAliasesUseCase unit tests', () => {
  it('should list all aliases available', async () => {
    const aliases = await listAliasesUseCase.execute()
    const aliasesCount = (await listAliases()).length
    expect(aliases).toHaveLength(aliasesCount)
  })
})

describe('FindAliasUseCase unit tests', () => {
  it('should create a new alias', async () => {
    alias = await findAliasUseCase.execute(alias.aliasId)
    const aliasFound = await findAliasByAliasID(alias.aliasId)

    expect(alias).toEqual(aliasFound)
  })
})

describe('UpdateAliasUseCase unit tests', () => {
  it('should update an alias', async () => {
    const updatedAlias = await updateAliasUseCase.execute(alias.aliasId, updateAliasInput)

    expect(updatedAlias).toEqual(
      expect.objectContaining({
        aliasId: updateAliasInput.aliasId,
        extraInfo: updateAliasInput.extraInfo,
        description: updateAliasInput.description,
        isRestricted: updateAliasInput.isRestricted,
      }),
    )
  })
})
