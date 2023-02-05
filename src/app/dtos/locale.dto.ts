import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger'

import { LocaleEntity } from '@app/entities/locale.entity'

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

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class CreateLocaleDto extends PickType(LocaleDto, [
  'localeId',
  'displayName',
  'extraInfo',
  'languageCode',
  'nativeLanguageDescription',
  'userId',
]) {
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
}

export class UpdateLocaleDto extends PartialType(CreateLocaleDto) {}
