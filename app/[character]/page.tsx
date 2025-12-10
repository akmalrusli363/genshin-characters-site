import { getAllElements, getCharacterByName, getCharacterStatsByName, getConstellationsByCharaName, getTalentsByCharacterName } from "@/app/api/constants";
import { ElementalProvider } from "@/app/element-context";
import CharacterDetailPage from "@/app/[character]/character-detail-page";
import { fromSlug, normalizeSlug } from "@/app/utils/slugify";
import { notFound, redirect } from "next/navigation";
import { mapToConstellationData } from "@/app/data/constellations";
import CharacterTalents from "./character-talents";
import CharacterConstellations from "./character-constellations";
import FloatingBackButton from "@/app/ui/floating-back-button";
import CharacterStatCard from "./character-stat";
import Character from "../data/character";
import { Suspense } from "react";
import CharacterStatPlaceholder from "./placeholder/character-stat-placeholder";
import CharacterTalentPlaceholder from "./placeholder/character-talent-placeholder";
import CharacterConstellationPlaceholder from "./placeholder/character-constellation-placeholder";

export async function generateMetadata({ params }: { params: Promise<{ character: string }> }) {
  const { character } = await params;
  const characterData = await getCharacterByName(character);
  if (!characterData) {
    return notFound();
  }
  return {
    title: characterData.name,
    description: `${characterData.elementText} ${characterData.weaponText} from ${characterData.region}`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ character: string }> }
) {
  const { character } = await params;
  const canonCharacterName = normalizeSlug(decodeURIComponent(character));

  if (character !== canonCharacterName) {
    return redirect(`/${canonCharacterName}`)
  }

  const characterName = fromSlug(canonCharacterName);

  const [characterData, elementData] = await Promise.all([
    getCharacterByName(characterName),
    getAllElements(),
  ])
  if (!characterData || !elementData) {
    return notFound()
  }
  return (
    <>
      <FloatingBackButton backToHome={true} />
      <ElementalProvider elements={elementData}>
        <Suspense fallback={<p className="text-center p-4rem">Loading {characterData.name}&apos;s data...</p>}>
          <CharacterDetailPage character={characterData} />
        </Suspense>
        <Suspense fallback={<CharacterStatPlaceholder />}>
          <CharacterStatSection characterName={characterName} characterData={characterData} />
        </Suspense>
        <Suspense fallback={<CharacterTalentPlaceholder />}>
          <CharacterTalentSection characterName={characterName} />
        </Suspense>
        <Suspense fallback={<CharacterConstellationPlaceholder />}>
          <CharacterConstellationSection characterName={characterName} characterData={characterData} />
        </Suspense>
      </ElementalProvider>
    </>
  );
}

async function CharacterTalentSection(
  { characterName }: { characterName: string }
) {
  const talentData = await getTalentsByCharacterName(characterName);
  return (
    <>
      {talentData && !Array.isArray(talentData) && <CharacterTalents talents={talentData} />}
    </>
  )
}

async function CharacterConstellationSection(
  { characterName, characterData }: { characterName: string, characterData: Character }
) {
  const constellationResponse = await getConstellationsByCharaName(characterName);
  if (!constellationResponse) {
    return null;
  }
  const constellationData = mapToConstellationData(constellationResponse);
  return (
    <>
      {constellationData && !Array.isArray(constellationData) && <CharacterConstellations constellations={constellationData} constellationName={characterData.constellation} />}
    </>
  )
}

async function CharacterStatSection(
  { characterName, characterData }: { characterName: string, characterData: Character }
) {
  const cStat = await getCharacterStatsByName(characterName);
  return (
    <>
      {cStat && <CharacterStatCard character={characterData} characterStat={cStat} />}
    </>
  )
}
