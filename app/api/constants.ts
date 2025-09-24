import Character from "../data/character"
import { ElementResponse, mapElementResponseToElement } from "../data/elements"
import { fetchWithEtag } from "../utils/etagCache"

const baseUrl = "https://genshin-db-api.vercel.app/api/v5/"
const charactersUrl = "characters"
const elementsUrl = "elements"
const weaponsUrl = "weapons"

const getAllParameters = new URLSearchParams({
  query: "names",
  matchCategories: "true",
  verboseCategories: "true"
})

const getParametersByQuery = (query: string) => new URLSearchParams({
  query: query,
  matchCategories: "true",
  verboseCategories: "true"
})

export const getAllCharacters = async () =>
    fetchWithEtag<Character[]>(`${baseUrl + charactersUrl}?${getAllParameters}`)

export const getAllElements = async () => {
    const response = await fetchWithEtag<ElementResponse[]>(`${baseUrl + elementsUrl}?${getAllParameters}`)
    return response.map(mapElementResponseToElement)
}

export const getCharacterByName = async (name: string) =>
    fetchWithEtag<Character>(`${baseUrl + charactersUrl}?${getParametersByQuery(name)}`)


