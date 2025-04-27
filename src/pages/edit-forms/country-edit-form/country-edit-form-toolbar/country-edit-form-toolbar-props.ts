import { Country } from "interfaces/country";

export interface CountryEditFormToolbarProps {
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  countries: Country[];
  countryId: string;
  handleCountryId: (countryId: string) => void
}
