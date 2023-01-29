import { PrismaClient } from '@prisma/client'

import { AliasDto, CreateAliasDto, UpdateAliasDto } from '@app/dtos/alias.dto'

const prisma = new PrismaClient()

export const createAliasInput: CreateAliasDto = {
  aliasId: 'creation',
  description: 'some description',
  extraInfo: 'some extra info',
  isRestricted: false,
  userId: 'cldhewanw0000tttnf0t2rhyj',
}

export const updateAliasInput: UpdateAliasDto = {
  aliasId: 'updated',
  isRestricted: true,
  extraInfo: 'Some extra info',
  description: 'Latin American locales update',
}

export async function findAliasByAliasID(aliasID: string): Promise<AliasDto> {
  return prisma.alias.findFirst({ where: { aliasId: aliasID } })
}

export async function listAliases(): Promise<AliasDto[]> {
  return prisma.alias.findMany()
}
