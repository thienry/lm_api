import { Injectable } from '@nestjs/common'

import { LocaleDto } from '@app/dtos/locale.dto'
import { LocaleRepository } from '@app/repositories/locale.repository'

@Injectable()
export class ListLocalesUseCase {
  constructor(private readonly localeRepository: LocaleRepository) {}

  /**
   * List locales.
   * @returns A list of locales.
   */
  async execute(): Promise<LocaleDto[]> {
    return this.localeRepository.list()
  }
}
