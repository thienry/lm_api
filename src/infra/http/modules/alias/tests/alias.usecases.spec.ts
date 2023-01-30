import { Test, TestingModule } from '@nestjs/testing'

import { AliasController } from '../alias.controller'
import { AliasDto, CreateAliasDto } from '@app/dtos/alias.dto'
import { DatabaseModule } from '@infra/database/database.module'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { createAliasInput, findAliasByAliasID, listAliases, updateAliasInput } from './alias.mock'
import {
  FindAliasUseCase,
  CreateAliasUseCase,
  DeleteAliasUseCase,
  ListAliasesUseCase,
  UpdateAliasUseCase,
} from '../usecases'

let alias: AliasDto
let findAliasUseCase: FindAliasUseCase
let createAliasUseCase: CreateAliasUseCase
let listAliasesUseCase: ListAliasesUseCase
let updateAliasUseCase: UpdateAliasUseCase
let deleteAliasUseCase: DeleteAliasUseCase

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [DatabaseModule],
    controllers: [AliasController],
    providers: [
      FindAliasUseCase,
      CreateAliasUseCase,
      ListAliasesUseCase,
      UpdateAliasUseCase,
      DeleteAliasUseCase,
    ],
  }).compile()

  findAliasUseCase = moduleFixture.get(FindAliasUseCase)
  createAliasUseCase = moduleFixture.get(CreateAliasUseCase)
  listAliasesUseCase = moduleFixture.get(ListAliasesUseCase)
  updateAliasUseCase = moduleFixture.get(UpdateAliasUseCase)
  deleteAliasUseCase = moduleFixture.get(DeleteAliasUseCase)
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

describe('DeleteAliasUseCase unit tests', () => {
  it('should delete an alias', async () => {
    const aliasDeleted = await deleteAliasUseCase.execute(alias.id)

    expect(aliasDeleted).toEqual(
      expect.objectContaining({
        aliasId: updateAliasInput.aliasId,
        extraInfo: updateAliasInput.extraInfo,
        description: updateAliasInput.description,
        isRestricted: updateAliasInput.isRestricted,
      }),
    )
  })

  it('should not delete an alias', async () => {
    expect(deleteAliasUseCase.execute('invalid_alias')).rejects.toThrow()
  })
})
