import { Injectable } from '@nestjs/common'

import { LocaleDto } from '@app/dtos/locale.dto'
import { LocaleRepository } from '@app/repositories/locale.repository'

@Injectable()
export class DeleteLocaleUseCase {
  constructor(private readonly localeRepository: LocaleRepository) {}

  /**
   * Performs the deletion of a given locale.
   * @param id - ID of the locale passed.
   * @returns The locale deleted.
   */
  async execute(id: string): Promise<LocaleDto> {
    return this.localeRepository.delete(id)
  }
}
