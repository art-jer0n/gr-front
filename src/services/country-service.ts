import { Country } from 'interfaces/country'

const COUNTRY_STORAGE_KEY = 'countries'

export const getCountries = (): Country[] => {
  const stored = localStorage.getItem(COUNTRY_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const saveCountries = (countries: Country[]): void => {
  localStorage.setItem(COUNTRY_STORAGE_KEY, JSON.stringify(countries))
}

export const generateCountryId = (): number => {
  const countries = getCountries()
  return countries.reduce((max, country) => Math.max(max, country.id), 0) + 1
}

export const addCountry = (country: Country): void => {
  const countries = getCountries()
  countries.push(country)
  saveCountries(countries)
}

export const updateCountry = (updatedCountry: Country): void => {
  const countries = getCountries()
  const index = countries.findIndex(c => c.id === updatedCountry.id)
  if (index !== -1) {
    countries[index] = updatedCountry
    saveCountries(countries)
  }
}

export const deleteCountry = (countryId: number) => {
  const countries = getCountries()
  const updatedCountries = countries.filter(country => country.id !== countryId)
  saveCountries(updatedCountries)
}
