import { cache } from "react"
import Character from "../data/character"
import { ElementResponse, mapElementResponseToElement } from "../data/elements"
import Talents from "../data/talents"
import { fetchWithEtag } from "../utils/etagCache"

const baseUrl = "https://genshin-db-api.vercel.app/api/v5/"
const charactersUrl = "characters"
const elementsUrl = "elements"
const weaponsUrl = "weapons"
const talentsUrl = "talents"
const constellationsUrl = "constellations"

export const baseWikiaUrl = "https://genshin-impact.fandom.com/wiki/"

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

export const getUiIconPath = (value: string) => "https://enka.network/ui/" + value + ".png";

export const getAllCharacters = async () =>
    fetchWithEtag<Character[]>(`${baseUrl + charactersUrl}?${getAllParameters}`)

export const getAllElements = async () => {
    const response = await fetchWithEtag<ElementResponse[]>(`${baseUrl + elementsUrl}?${getAllParameters}`)
    return response.map(mapElementResponseToElement)
}

export const getCharacterByName = cache(async (name: string) =>
    fetchWithEtag<Character>(`${baseUrl + charactersUrl}?${getParametersByQuery(name)}`))

export const getConstellationsByCharaName = async (name: string) =>
    fetchWithEtag<any>(`${baseUrl + constellationsUrl}?${getParametersByQuery(name)}`)

export const getTalentsByCharacterName = async (name: string) =>
    fetchWithEtag<Talents|null>(`${baseUrl + talentsUrl}?${getParametersByQuery(name)}`)

