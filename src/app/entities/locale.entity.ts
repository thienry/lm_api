import { Locale } from '@prisma/client'

export class LocaleEntity implements Locale {
  id: string
  localeId: string
  displayName: string
  languageCode: string
  nativeLanguageDescription: string
  extraInfo: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
