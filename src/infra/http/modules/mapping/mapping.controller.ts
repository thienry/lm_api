import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { CreateMappingDto, MappingDto } from '@app/dtos/mapping.dto'
import {
  CreateMappingUseCase,
  FindMappingUseCase,
  ListMappingsUseCase,
  ListMappingsScriptsUseCase,
} from './usecases'

@ApiTags('Mapping')
@Controller('mappings')
export class MappingController {
  constructor(
    private readonly createMappingUseCase: CreateMappingUseCase,
    private readonly listMappingsUseCase: ListMappingsUseCase,
    private readonly findMappingUseCase: FindMappingUseCase,
    private readonly listMappingsScriptsUseCase: ListMappingsScriptsUseCase,
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
}
