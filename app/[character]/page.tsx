import { getAllElements, getCharacterByName, getTalentsByCharacterName } from "@/app/api/constants";
import { ElementalProvider } from "@/app/element-context";
import CharacterDetailPage from "@/app/[character]/character-detail-page";
import { fromSlug, normalizeSlug } from "@/app/utils/slugify";
import { redirect } from "next/navigation";
import CharacterTalents from "./character-talents";
import FloatingBackButton from "@/app/ui/floating-back-button";

export async function generateMetadata({ params }: { params: Promise<{ character: string }> }) {
  const { character } = await params;
  const characterData = await getCharacterByName(character);
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

  const [characterData, elementData, talentData] = await Promise.all([
    getCharacterByName(characterName),
    getAllElements(),
    getTalentsByCharacterName(characterName),
  ])
  return (
    <>
      <FloatingBackButton backToHome={true} />
      <ElementalProvider elements={elementData}>
        <CharacterDetailPage character={characterData} />
        {talentData && !Array.isArray(talentData) && <CharacterTalents talents={talentData} />}
      </ElementalProvider>
    </>
  );
}
