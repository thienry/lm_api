import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { CreateMappingDto, MappingDto } from '@app/dtos/mapping.dto'
import { CreateMappingUseCase } from './usecases/create-mapping.usecase'

@ApiTags('Mapping')
@Controller('mappings')
export class MappingController {
  constructor(private readonly createMappingUseCase: CreateMappingUseCase) {}

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
}
