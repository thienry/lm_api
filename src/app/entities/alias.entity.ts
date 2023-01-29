import { Alias } from '@prisma/client'

export class AliasEntity implements Alias {
  id: string
  aliasId: string
  extraInfo: string
  description: string
  isRestricted: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}
