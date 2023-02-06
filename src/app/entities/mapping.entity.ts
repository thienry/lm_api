import { Mapping } from '@prisma/client'

export class MappingEntity implements Mapping {
  id: string
  key: string
  script: string
  roleId: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
