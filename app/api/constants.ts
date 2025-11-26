import { cache } from "react"
import Character from "../data/character"
import { ElementResponse, mapElementResponseToElement } from "../data/elements"
import Talents from "../data/talents"
import { fetchWithEtag } from "../utils/etagCache"
import CharacterStat from "../data/chara-stat"
import { RawConstellationData } from "../data/constellations"

const baseUrl = "https://genshin-db-api.vercel.app/api/v5/"
const charactersUrl = "characters"
const elementsUrl = "elements"
const talentsUrl = "talents"
const constellationsUrl = "constellations"
const statsUrl = "stats"

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

const getParameterByQuery = (query: string) => new URLSearchParams({
  query: query,
  verboseCategories: "true"
})

const getStatByQuery = (query: string) => new URLSearchParams({
  query: query,
  verboseCategories: "true",
  folder: "characters"
})

export const getUiIconPath = (value: string) => "https://enka.network/ui/" + value + ".png";
export const getUiItemIconPath = (itemId: number) => `https://enka.network/ui/UI_ItemIcon_${itemId}.png`;

export const getAllCharacters = async () =>
    fetchWithEtag<Character[]>(`${baseUrl + charactersUrl}?${getAllParameters}`)

export const getAllElements = async () => {
    const response = await fetchWithEtag<ElementResponse[]>(`${baseUrl + elementsUrl}?${getAllParameters}`)
    return response && response.map(mapElementResponseToElement)
}

export const getCharacterByName = cache(async (name: string) =>
    fetchWithEtag<Character>(`${baseUrl + charactersUrl}?${getParameterByQuery(name)}`))

export const getConstellationsByCharaName = async (name: string) =>
    fetchWithEtag<RawConstellationData>(`${baseUrl + constellationsUrl}?${getParameterByQuery(name)}`)

export const getTalentsByCharacterName = async (name: string) =>
    fetchWithEtag<Talents|null>(`${baseUrl + talentsUrl}?${getParameterByQuery(name)}`)

export const getCharacterStatsByName = async (name: string) =>
    fetchWithEtag<Record<string, CharacterStat>>(`${baseUrl + statsUrl}?${getStatByQuery(name)}`)

