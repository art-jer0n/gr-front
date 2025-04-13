import { Country } from 'interfaces/country'

export interface CountryEditBlockProps {
  country: Country
  onChange: (field: keyof Country, value: string | File) => void
  errors: Partial<Record<keyof Country, string>>
}
