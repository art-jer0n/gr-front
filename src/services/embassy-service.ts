import { Embassy } from 'interfaces/embassy'

const EMBASSY_STORAGE_KEY = 'embassies'

export const getEmbassies = (): Embassy[] => {
  const stored = localStorage.getItem(EMBASSY_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const saveEmbassies = (embassies: Embassy[]): void => {
  localStorage.setItem(EMBASSY_STORAGE_KEY, JSON.stringify(embassies))
}

export const generateEmbassyId = (): number => {
  const embassies = getEmbassies()
  return (
    embassies.reduce((max, embassy) => Math.max(max, embassy.embassyId), 0) + 1
  )
}

export const addEmbassy = (embassy: Embassy): void => {
  const embassies = getEmbassies()
  embassies.push(embassy)
  saveEmbassies(embassies)
}

export const updateEmbassy = (updatedEmbassy: Embassy): void => {
  const embassies = getEmbassies()
  const index = embassies.findIndex(
    e => e.embassyId === updatedEmbassy.embassyId,
  )
  if (index !== -1) {
    embassies[index] = updatedEmbassy
    saveEmbassies(embassies)
  }
}

export const deleteEmbassy = (embassyId: number) => {
  const embassies = getEmbassies()
  const updatedEmbassies = embassies.filter(
    embassy => embassy.embassyId !== embassyId,
  )
  saveEmbassies(updatedEmbassies)
}
