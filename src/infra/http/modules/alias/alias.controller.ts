import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { AliasDto, CreateAliasDto } from '@app/dtos/alias.dto'
import { CreateAliasUseCase } from './usecases/create-alias.usecase'

@ApiTags('Alias')
@Controller('aliases')
export class AliasController {
  constructor(private readonly createAliasUseCase: CreateAliasUseCase) {}

  /**
   * Creates new alias.
   * @params aliasData - Alias data.
   * @returns The alias created.
   */
  @Post()
  @ApiBody({ type: CreateAliasDto })
  @ApiCreatedResponse({ type: AliasDto, description: 'The alias has been successfully created.' })
  async createAlias(@Body() aliasData: CreateAliasDto): Promise<AliasDto> {
    return this.createAliasUseCase.execute(aliasData)
  }
}
