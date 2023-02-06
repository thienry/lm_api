import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { CreateLocaleDto, LocaleDto, UpdateLocaleDto } from '@app/dtos/locale.dto'
import {
  CreateLocaleUseCase,
  FindLocaleUseCase,
  ListLocalesUseCase,
  UpdateLocaleUseCase,
  DeleteLocaleUseCase,
} from './usecases'

@ApiTags('Locale')
@Controller('locales')
export class LocaleController {
  constructor(
    private readonly findLocaleUseCase: FindLocaleUseCase,
    private readonly listLocalesUseCase: ListLocalesUseCase,
    private readonly createLocaleUseCase: CreateLocaleUseCase,
    private readonly updateLocaleUseCase: UpdateLocaleUseCase,
    private readonly deleteLocaleUseCase: DeleteLocaleUseCase,
  ) {}

  /**
   * Creates new locale.
   * @param localeData - Locale data.
   * @returns The locale created.
   */
  @Post()
  @ApiBody({ type: CreateLocaleDto })
  @ApiCreatedResponse({ type: LocaleDto })
  async createLocale(@Body() localeData: CreateLocaleDto): Promise<LocaleDto> {
    return this.createLocaleUseCase.execute(localeData)
  }

  /**
   * list locales.
   * @returns A list of locales.
   */
  @Get()
  @ApiOkResponse({ type: [LocaleDto] })
  async listLocales(): Promise<LocaleDto[]> {
    return this.listLocalesUseCase.execute()
  }

  /**
   * Find a Locale.
   * @param localeId - LocaleID.
   * @returns The locale found.
   */
  @Get(':localeId')
  @ApiOkResponse({ type: LocaleDto })
  async findLocale(@Param('localeId') localeId: string): Promise<LocaleDto> {
    return this.findLocaleUseCase.execute(localeId)
  }

  /**
   * Update a locale.
   * @param localeData - Locale data.
   * @returns The locale updated.
   */
  @Put(':localeId')
  @ApiBody({ type: UpdateLocaleDto })
  @ApiOkResponse({ type: LocaleDto })
  async updateLocale(
    @Param('localeId') localeId: string,
    @Body() localeData: UpdateLocaleDto,
  ): Promise<LocaleDto> {
    return this.updateLocaleUseCase.execute(localeId, localeData)
  }

  /**
   * Delete a locale.
   * @param id - an ID.
   * @returns The locale deleted.
   */
  @Delete(':id')
  @ApiOkResponse({ type: LocaleDto })
  async deleteLocale(@Param('id') id: string): Promise<LocaleDto> {
    return this.deleteLocaleUseCase.execute(id)
  }
}
