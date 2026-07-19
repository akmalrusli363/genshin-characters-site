import { cache } from "react"
import Character from "../data/character"
import { ElementResponse, mapElementResponseToElement } from "../data/elements"
import Talents from "../data/talents"
import { fetchData } from "../utils/etagCache"
import CharacterStat from "../data/chara-stat"
import { RawConstellationData } from "../data/constellations"
import Namecard from "../data/namecard"

const baseUrl = "https://genshin-db-api.vercel.app/api/v5/"
const charactersUrl = "characters"
const elementsUrl = "elements"
const talentsUrl = "talents"
const constellationsUrl = "constellations"
const statsUrl = "stats"
const namecardsUrl = "namecards"

export const baseWikiaUrl = "https://genshin-impact.fandom.com/wiki/"

const getAllParameters = new URLSearchParams({
  query: "names",
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
export const getUiNamecardIconPath = (value: string) => `https://api.lunaris.moe/data/assets/namecardalpha/${value}.png`;
export const getUiItemIconPath = (itemId: number) => `https://api.lunaris.moe/data/assets/items/UI_ItemIcon_${itemId}.png`;

export const getAllCharacters = async () =>
  fetchData<Character[]>(`${baseUrl + charactersUrl}?${getAllParameters}`)

export const getAllElements = async () => {
  const response = await fetchData<ElementResponse[]>(`${baseUrl + elementsUrl}?${getAllParameters}`)
  return response && response.map(mapElementResponseToElement)
}

export const getCharacterByName = cache(async (name: string) =>
  fetchData<Character>(`${baseUrl + charactersUrl}?${getParameterByQuery(name)}`))

export const getConstellationsByCharaName = async (name: string) => {
  return fetchData<RawConstellationData>(`${baseUrl + constellationsUrl}?${getParameterByQuery(name)}`)
}

export const getTalentsByCharacterName = async (name: string) => {
  return fetchData<Talents | null>(`${baseUrl + talentsUrl}?${getParameterByQuery(name)}`)
}

export const getCharacterStatsByName = async (name: string) => {
  return fetchData<Record<string, CharacterStat>>(`${baseUrl + statsUrl}?${getStatByQuery(name)}`)
}

export const getCharacterNameCard = async (name: string) =>
  fetchData<Namecard>(`${baseUrl + namecardsUrl}?${getParameterByQuery(name)}`)

export const getAllNamecards = async () => {
  return fetchData<Namecard[]>(`${baseUrl + namecardsUrl}?${getAllParameters}`)
}
