import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AliasDto, CreateAliasDto, UpdateAliasDto } from '@app/dtos/alias.dto'
import {
  FindAliasUseCase,
  CreateAliasUseCase,
  DeleteAliasUseCase,
  ListAliasesUseCase,
  UpdateAliasUseCase,
} from './usecases'

@ApiTags('Alias')
@Controller('aliases')
export class AliasController {
  constructor(
    private readonly findAliasUseCase: FindAliasUseCase,
    private readonly createAliasUseCase: CreateAliasUseCase,
    private readonly listAliasesUseCase: ListAliasesUseCase,
    private readonly updateAliasUseCase: UpdateAliasUseCase,
    private readonly deleteAliasUseCase: DeleteAliasUseCase,
  ) {}

  /**
   * Creates new alias.
   * @param aliasData - Alias data.
   * @returns The alias created.
   */
  @Post()
  @ApiBody({ type: CreateAliasDto })
  @ApiCreatedResponse({ type: AliasDto })
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
   * @param aliasID - AliasID.
   * @returns The alias found.
   */
  @Get(':aliasId')
  @ApiOkResponse({ type: AliasDto })
  async findAlias(@Param('aliasId') aliasID: string): Promise<AliasDto> {
    return this.findAliasUseCase.execute(aliasID)
  }

  /**
   * Update an alias.
   * @param aliasData - Alias data.
   * @returns The alias updated.
   */
  @Put(':aliasId')
  @ApiBody({ type: UpdateAliasDto })
  @ApiOkResponse({ type: AliasDto })
  async updateAlias(
    @Param('aliasId') aliasId: string,
    @Body() aliasData: UpdateAliasDto,
  ): Promise<AliasDto> {
    return this.updateAliasUseCase.execute(aliasId, aliasData)
  }

  /**
   * Delete an alias.
   * @param id - an ID.
   * @returns The alias deleted.
   */
  @Delete(':id')
  @ApiOkResponse({ type: AliasDto })
  async deleteAlias(@Param('id') id: string): Promise<AliasDto> {
    return this.deleteAliasUseCase.execute(id)
  }
}
