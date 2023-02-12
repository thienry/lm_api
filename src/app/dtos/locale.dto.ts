import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger'

import { AliasEntity } from '@app/entities/alias.entity'
import { LocaleEntity } from '@app/entities/locale.entity'
import { MappingEntity } from '@app/entities/mapping.entity'

export class LocaleMappingDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  value: string
}

export class UpsertLocaleAliasDto extends PickType(AliasEntity, ['aliasId']) {
  @ApiProperty()
  @IsString()
  aliasId: string
}

export class UpsertLocaleMappingDto extends OmitType(MappingEntity, ['createdAt', 'updatedAt']) {
  @ApiProperty()
  @IsString()
  @IsDefined()
  value: string
}

export class LocaleDto extends LocaleEntity {
  @ApiProperty()
  id: string

  @ApiProperty()
  localeId: string

  @ApiProperty()
  displayName: string

  @ApiProperty()
  languageCode: string

  @ApiProperty()
  nativeLanguageDescription: string

  @ApiProperty()
  extraInfo: string

  @ApiProperty()
  userId: string

  @Type(() => UpsertLocaleAliasDto)
  @ApiPropertyOptional({ type: [UpsertLocaleAliasDto] })
  aliases: UpsertLocaleAliasDto[]

  @Type(() => LocaleMappingDto)
  @ApiPropertyOptional({ type: [LocaleMappingDto] })
  mappings: LocaleMappingDto[]

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class CreateLocaleDto extends PickType(LocaleDto, [
  'id',
  'localeId',
  'displayName',
  'extraInfo',
  'languageCode',
  'nativeLanguageDescription',
  'userId',
]) {
  @IsOptional()
  @ApiPropertyOptional()
  id: string

  @IsString()
  @IsDefined()
  @ApiProperty()
  localeId: string

  @IsString()
  @IsDefined()
  @ApiProperty()
  displayName: string

  @IsOptional()
  @ApiPropertyOptional()
  extraInfo: string

  @IsBoolean()
  @ApiPropertyOptional()
  languageCode: string

  @IsBoolean()
  @ApiPropertyOptional()
  nativeLanguageDescription: string

  @IsString()
  @IsDefined()
  @ApiProperty()
  userId: string

  @IsDefined()
  @IsArray()
  @Type(() => UpsertLocaleAliasDto)
  @ApiProperty({ type: [UpsertLocaleAliasDto] })
  aliases: UpsertLocaleAliasDto[]

  @IsDefined()
  @IsArray()
  @Type(() => UpsertLocaleMappingDto)
  @ApiProperty({ type: [UpsertLocaleMappingDto] })
  mappings: UpsertLocaleMappingDto[]
}

export class UpdateLocaleDto extends PartialType(CreateLocaleDto) {}
