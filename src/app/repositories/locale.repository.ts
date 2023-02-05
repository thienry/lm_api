import { LocaleDto, CreateLocaleDto } from '@app/dtos/locale.dto'

export abstract class LocaleRepository {
  /**
   * Creates a new locale on database.
   * @param locale - CreateLocale object.
   * @returns The new locale created.
   */
  abstract create(locale: CreateLocaleDto): Promise<LocaleDto>
}
