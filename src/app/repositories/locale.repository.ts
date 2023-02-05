import { LocaleDto, CreateLocaleDto, UpdateLocaleDto } from '@app/dtos/locale.dto'

export abstract class LocaleRepository {
  /**
   * Creates a new locale on database.
   * @param locale - CreateLocale object.
   * @returns The new locale created.
   */
  abstract create(locale: CreateLocaleDto): Promise<LocaleDto>

  /**
   * List locales.
   * @returns A list of locales.
   */
  abstract list(): Promise<LocaleDto[]>

  /**
   * Find an locale by localeID.
   * @param localeId - An localeID.
   * @returns The locale found.
   */
  abstract findByLocaleId(localeId: string): Promise<LocaleDto>

  /**
   * Update a locale by localeID.
   * @param localeId - A localeID.
   * @returns The locale updated.
   */
  abstract update(localeId: string, locale: UpdateLocaleDto): Promise<LocaleDto>
}
