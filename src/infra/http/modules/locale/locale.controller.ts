import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { CreateLocaleDto, LocaleDto } from '@app/dtos/locale.dto'
import { CreateLocaleUseCase, FindLocaleUseCase, ListLocalesUseCase } from './usecases'

@ApiTags('Locale')
@Controller('locales')
export class LocaleController {
  constructor(
    private readonly findLocaleUseCase: FindLocaleUseCase,
    private readonly listLocalesUseCase: ListLocalesUseCase,
    private readonly createLocaleUseCase: CreateLocaleUseCase,
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
}
