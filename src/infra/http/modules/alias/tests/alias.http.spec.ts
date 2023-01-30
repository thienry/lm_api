import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { AliasDto } from '@app/dtos/alias.dto'
import { AliasController } from '../alias.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { createAliasInput, findAliasByAliasID, listAliases, updateAliasInput } from './alias.mock'
import {
  FindAliasUseCase,
  CreateAliasUseCase,
  DeleteAliasUseCase,
  ListAliasesUseCase,
  UpdateAliasUseCase,
} from '../usecases'

let alias: AliasDto
let app: INestApplication

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

  app = moduleFixture.createNestApplication()
  await app.init()
})

describe('Create Alias', () => {
  it('should create an alias', async () => {
    const response = await request(app.getHttpServer())
      .post('/aliases')
      .send(createAliasInput)
      .expect(201)

    alias = response.body

    expect(alias.id).toBeDefined()
    expect(alias).toEqual(
      expect.objectContaining({
        aliasId: createAliasInput.aliasId,
        description: createAliasInput.description,
        extraInfo: createAliasInput.extraInfo,
        isRestricted: createAliasInput.isRestricted,
        userId: createAliasInput.userId,
      }),
    )
  })

  it('should not create an alias', async () => {
    const response = await request(app.getHttpServer()).post('/aliases').send({})
    expect(response.statusCode).toBe(500)
  })
})

describe('List Aliases unit tests', () => {
  it('should list all aliases available', async () => {
    const response = await request(app.getHttpServer()).get('/aliases').expect(200)
    const aliasesCount = (await listAliases()).length
    expect(response.body).toHaveLength(aliasesCount)
  })
})

describe('Find Alias unit tests', () => {
  it('should find an specific alias by aliasId', async () => {
    const response = await request(app.getHttpServer()).get(`/aliases/${alias.aliasId}`).expect(200)
    const aliasFound = await findAliasByAliasID(alias.aliasId)

    expect(response.body).toEqual(
      expect.objectContaining({
        aliasId: aliasFound.aliasId,
        extraInfo: aliasFound.extraInfo,
        description: aliasFound.description,
        isRestricted: aliasFound.isRestricted,
      }),
    )
  })
})

describe('Update Alias unit tests', () => {
  it('should update an alias', async () => {
    const response = await request(app.getHttpServer())
      .put(`/aliases/${alias.aliasId}`)
      .send(updateAliasInput)
      .expect(200)

    expect(response.body).toEqual(
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
    const response = await request(app.getHttpServer()).delete(`/aliases/${alias.id}`).expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        aliasId: updateAliasInput.aliasId,
        extraInfo: updateAliasInput.extraInfo,
        description: updateAliasInput.description,
        isRestricted: updateAliasInput.isRestricted,
      }),
    )
  })

  it('should not delete an alias', async () => {
    const response = await request(app.getHttpServer()).delete(`/aliases/invalid_aliasId`)
    expect(response.statusCode).toBe(500)
  })
})
