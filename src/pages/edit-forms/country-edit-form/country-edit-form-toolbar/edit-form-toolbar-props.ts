import { Country } from "interfaces/country";

export interface CountryFormToolbarProps {
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  countries: Country[];
  countryId: string;
  handleCountryId: (countryId: string) => void
}
