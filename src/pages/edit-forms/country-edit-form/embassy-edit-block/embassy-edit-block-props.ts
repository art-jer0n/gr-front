import { Embassy } from 'interfaces/embassy'

export interface EmbassyEditBlockProps {
  formTitle: string
  embassy: Embassy
  onChange: (field: keyof Embassy, value: string) => void
  errors: Partial<Record<keyof Embassy, string>>
}
