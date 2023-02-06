import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { CreateMappingDto, MappingDto, UpdateMappingDto } from '@app/dtos/mapping.dto'
import {
  CreateMappingUseCase,
  FindMappingUseCase,
  ListMappingsUseCase,
  ListMappingsScriptsUseCase,
  UpdateMappingUseCase,
  DeleteMappingUseCase,
} from './usecases'

@ApiTags('Mapping')
@Controller('mappings')
export class MappingController {
  constructor(
    private readonly createMappingUseCase: CreateMappingUseCase,
    private readonly listMappingsUseCase: ListMappingsUseCase,
    private readonly findMappingUseCase: FindMappingUseCase,
    private readonly listMappingsScriptsUseCase: ListMappingsScriptsUseCase,
    private readonly updateMappingUseCase: UpdateMappingUseCase,
    private readonly deleteMappingUseCase: DeleteMappingUseCase,
  ) {}

  /**
   * Creates new mapping.
   * @param mappingData - Mapping data.
   * @returns The mapping created.
   */
  @Post()
  @ApiBody({ type: CreateMappingDto })
  @ApiCreatedResponse({ type: MappingDto })
  async createMapping(@Body() mappingData: CreateMappingDto): Promise<MappingDto> {
    return this.createMappingUseCase.execute(mappingData)
  }

  /**
   * list mappings.
   * @returns A list of mappings.
   */
  @Get()
  @ApiOkResponse({ type: [MappingDto] })
  async listMappings(): Promise<MappingDto[]> {
    return this.listMappingsUseCase.execute()
  }

  /**
   * Find mappings scripts.
   * @returns A list of mappings scripts.
   */
  @Get('scripts')
  @ApiOkResponse({ type: [String] })
  async findMappingScripts(): Promise<string[]> {
    return this.listMappingsScriptsUseCase.execute()
  }

  /**
   * Find a Mapping.
   * @param key - A Mapping key.
   * @returns The mapping found.
   */
  @Get(':key')
  @ApiOkResponse({ type: MappingDto })
  async findMapping(@Param('key') key: string): Promise<MappingDto> {
    return this.findMappingUseCase.execute(key)
  }

  /**
   * Update a mapping.
   * @param mappingData - Mapping data.
   * @returns The mapping updated.
   */
  @Put(':key')
  @ApiBody({ type: UpdateMappingDto })
  @ApiOkResponse({ type: MappingDto })
  async updateMapping(
    @Param('key') key: string,
    @Body() mappingData: UpdateMappingDto,
  ): Promise<MappingDto> {
    return this.updateMappingUseCase.execute(key, mappingData)
  }

  /**
   * Delete a mapping.
   * @param id - an ID.
   * @returns The mapping deleted.
   */
  @Delete(':id')
  @ApiOkResponse({ type: MappingDto })
  async deleteMapping(@Param('id') id: string): Promise<MappingDto> {
    return this.deleteMappingUseCase.execute(id)
  }
}
