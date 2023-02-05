import { Injectable } from '@nestjs/common'

import { LocaleDto } from '@app/dtos/locale.dto'
import { LocaleRepository } from '@app/repositories/locale.repository'

@Injectable()
export class FindLocaleUseCase {
  constructor(private readonly localeRepository: LocaleRepository) {}

  /**
   * Find a locale.
   * @returns The locale found.
   */
  async execute(localeId: string): Promise<LocaleDto> {
    return this.localeRepository.findByLocaleId(localeId)
  }
}
