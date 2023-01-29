import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger'
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator'

import { AliasEntity } from '@app/entities/alias.entity'

export class AliasDto extends AliasEntity {}

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
}

export class UpdateAliasDto extends PartialType(CreateAliasDto) {}
