import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { CreateLocaleDto, LocaleDto } from '@app/dtos/locale.dto'
import { CreateLocaleUseCase } from './usercases/create-locale.usecase'

@ApiTags('Locale')
@Controller('locales')
export class LocaleController {
  constructor(private readonly createLocaleUseCase: CreateLocaleUseCase) {}

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
}
