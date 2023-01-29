import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { FindAliasUseCase } from './usecases/find-alias.usecase'
import { ListAliasesUseCase } from './usecases/list-alias.usecase'
import { CreateAliasUseCase } from './usecases/create-alias.usecase'
import { UpdateAliasUseCase } from './usecases/update-alias.usecase'
import { AliasDto, CreateAliasDto, UpdateAliasDto } from '@app/dtos/alias.dto'

@ApiTags('Alias')
@Controller('aliases')
export class AliasController {
  constructor(
    private readonly findAliasUseCase: FindAliasUseCase,
    private readonly createAliasUseCase: CreateAliasUseCase,
    private readonly listAliasesUseCase: ListAliasesUseCase,
    private readonly updateAliasUseCase: UpdateAliasUseCase,
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

  /**
   * Creates new alias.
   * @params aliasData - Alias data.
   * @returns The alias created.
   */
  @Put(':aliasId')
  @ApiBody({ type: UpdateAliasDto })
  @ApiOkResponse({ type: AliasDto, description: 'The alias has been successfully updated.' })
  async updateAlias(
    @Param('aliasId') aliasId: string,
    @Body() aliasData: UpdateAliasDto,
  ): Promise<AliasDto> {
    return this.updateAliasUseCase.execute(aliasId, aliasData)
  }
}
