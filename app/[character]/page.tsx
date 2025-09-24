import { getAllCharacters, getAllElements, getCharacterByName } from "@/app/api/constants";
import { ElementalProvider } from "@/app/element-context";
import CharacterDetailPage from "@/app/[character]/character-detail-page";
import { fromSlug, normalizeSlug } from "@/app/utils/slugify";
import { redirect } from "next/navigation";

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
    getAllElements()
  ])
  return (
    <ElementalProvider elements={elementData}>
      <CharacterDetailPage character={characterData} />
    </ElementalProvider>
  );
}
