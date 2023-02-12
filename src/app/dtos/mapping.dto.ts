import { IsArray, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger'

import { LocaleEntity } from '@app/entities/locale.entity'
import { MappingEntity } from '@app/entities/mapping.entity'
import { Type } from 'class-transformer'

export class UpsertMappingLocaleDto extends PickType(LocaleEntity, ['localeId']) {
  @ApiProperty()
  @IsString()
  localeId: string
}

export class MappingDto extends MappingEntity {
  @ApiProperty()
  id: string

  @ApiProperty()
  key: string

  @ApiProperty()
  script: string

  @ApiPropertyOptional()
  value?: string

  @ApiProperty()
  roleId: string

  @ApiProperty()
  userId: string

  @Type(() => UpsertMappingLocaleDto)
  @ApiPropertyOptional({ type: [UpsertMappingLocaleDto] })
  locales: UpsertMappingLocaleDto[]

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class CreateMappingDto extends PickType(MappingDto, ['key', 'script', 'roleId', 'userId']) {
  @IsString()
  @ApiProperty()
  key: string

  @IsString()
  @ApiProperty()
  value: string

  @IsString()
  @ApiProperty()
  script: string

  @IsString()
  @ApiProperty()
  roleId: string

  @IsString()
  @ApiProperty()
  userId: string

  @IsArray()
  @ApiProperty()
  locales: [{ localeId: string }]
}

export class MappingScriptDto extends PickType(MappingDto, ['script']) {}

export class UpdateMappingDto extends PartialType(CreateMappingDto) {}
