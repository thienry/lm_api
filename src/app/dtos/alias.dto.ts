import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger'

import { AliasEntity } from '@app/entities/alias.entity'
import { LocaleEntity } from '@app/entities/locale.entity'

export class UpsertAliasLocaleDto extends OmitType(LocaleEntity, ['createdAt', 'updatedAt']) {
  @IsString()
  @IsOptional()
  id: string

  @IsDefined()
  @IsString()
  @ApiProperty()
  localeId: string

  @IsDefined()
  @IsString()
  displayName: string

  @IsDefined()
  @IsString()
  languageCode: string

  @IsDefined()
  @IsString()
  nativeLanguageDescription: string

  @IsString()
  extraInfo: string

  @IsDefined()
  @IsString()
  userId: string
}

export class AliasDto extends AliasEntity {
  @ApiProperty()
  id: string

  @ApiProperty()
  aliasId: string

  @ApiProperty()
  extraInfo: string

  @ApiProperty()
  description: string

  @ApiProperty()
  isRestricted: boolean

  @Type(() => UpsertAliasLocaleDto)
  @ApiPropertyOptional({ type: [UpsertAliasLocaleDto] })
  locales: UpsertAliasLocaleDto[]

  @ApiProperty()
  userId: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class CreateAliasDto extends PickType(AliasDto, [
  'aliasId',
  'description',
  'extraInfo',
  'isRestricted',
  'userId',
]) {
  @IsString()
  @IsDefined()
  @ApiProperty()
  aliasId: string

  @IsString()
  @IsDefined()
  @ApiProperty()
  description: string

  @IsOptional()
  @ApiPropertyOptional()
  extraInfo: string

  @IsBoolean()
  @ApiPropertyOptional()
  isRestricted: boolean

  @IsString()
  @IsDefined()
  @ApiProperty()
  userId: string

  @IsDefined()
  @IsArray()
  @Type(() => UpsertAliasLocaleDto)
  @ApiProperty({ type: [UpsertAliasLocaleDto] })
  locales: UpsertAliasLocaleDto[]
}

export class UpdateAliasDto extends PartialType(CreateAliasDto) {}
