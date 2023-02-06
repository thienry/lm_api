import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'

import { MappingEntity } from '@app/entities/mapping.entity'

export class MappingDto extends MappingEntity {
  @ApiProperty()
  id: string

  @ApiProperty()
  key: string

  @ApiProperty()
  script: string

  @ApiProperty()
  roleId: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class CreateMappingDto extends PickType(MappingDto, ['key', 'script', 'roleId', 'userId']) {}

export class MappingScriptDto extends PickType(MappingDto, ['script']) {}

export class UpdateMappingDto extends PartialType(CreateMappingDto) {}
