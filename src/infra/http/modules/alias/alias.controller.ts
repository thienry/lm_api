import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AliasDto, CreateAliasDto } from '@app/dtos/alias.dto'
import { FindAliasUseCase } from './usecases/find-alias.usecase'
import { ListAliasesUseCase } from './usecases/list-alias.usecase'
import { CreateAliasUseCase } from './usecases/create-alias.usecase'

@ApiTags('Alias')
@Controller('aliases')
export class AliasController {
  constructor(
    private readonly createAliasUseCase: CreateAliasUseCase,
    private readonly listAliasesUseCase: ListAliasesUseCase,
    private readonly findAliasUseCase: FindAliasUseCase,
  ) {}

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

  /**
   * list aliases.
   * @returns A list of aliases.
   */
  @Get()
  @ApiOkResponse({ type: [AliasDto] })
  async listAliases(): Promise<AliasDto[]> {
    return this.listAliasesUseCase.execute()
  }

  /**
   * Find an Alias.
   * @params aliasID - AliasID.
   * @returns The alias found.
   */
  @Get(':aliasId')
  @ApiOkResponse({ type: AliasDto })
  async findAlias(@Param('aliasId') aliasID: string): Promise<AliasDto> {
    return this.findAliasUseCase.execute(aliasID)
  }
}
