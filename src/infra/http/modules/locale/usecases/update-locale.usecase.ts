import { Injectable } from '@nestjs/common'

import { LocaleDto, UpdateLocaleDto } from '@app/dtos/locale.dto'
import { LocaleRepository } from '@app/repositories/locale.repository'

@Injectable()
export class UpdateLocaleUseCase {
  constructor(private readonly localeRepository: LocaleRepository) {}

  /**
   * Performs the update of a given locale.
   * @param localeId - LocaleID of the locale passed.
   * @param locale - Locale to update.
   * @returns The locale updated.
   */
  async execute(localeId: string, locale: UpdateLocaleDto): Promise<LocaleDto> {
    return this.localeRepository.update(localeId, locale)
  }
}
