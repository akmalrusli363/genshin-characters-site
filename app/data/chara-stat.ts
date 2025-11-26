export default interface CharacterStat{
  level: number,
  ascension: number,
  hp: number,
  attack: number,
  defense: number,
  specialized: number
}

export function mapToGroupedCharacterStat(characterStatData: Record<string, CharacterStat>) {
  const levels: Record<string, CharacterStat> = {};
  const ascensions: Record<string, CharacterStat> = {};

  for (const [key, value] of Object.entries(characterStatData)) {
    if (/^\d+$/.test(key)) {
      levels[key] = value;
    } else {
      ascensions[value.ascension] = value;
    }
  }

  return {levels, ascensions};
}