import { Injectable } from '@nestjs/common'

import { Usecase } from '@app/usecases/usecase.interface'
import { CreateLocaleDto, LocaleDto } from '@app/dtos/locale.dto'
import { LocaleRepository } from '@app/repositories/locale.repository'

@Injectable()
export class CreateLocaleUseCase implements Usecase<CreateLocaleDto, LocaleDto> {
  constructor(private readonly localeRepository: LocaleRepository) {}

  /**
   * Performs the creation of a new locale.
   * @param locale - Locale to create.
   * @returns The locale created.
   */
  async execute(locale: CreateLocaleDto): Promise<LocaleDto> {
    return this.localeRepository.create(locale)
  }
}
