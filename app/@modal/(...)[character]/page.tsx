import { baseWikiaUrl, getAllElements, getCharacterByName } from "@/app/api/constants";
import { ElementalProvider } from "@/app/element-context";
import CharacterDetailPage from "@/app/[character]/character-detail-page";
import { fromSlug, normalizeSlug } from "@/app/utils/slugify";
import { redirect } from "next/navigation";
import { Modal } from "@/app/ui/modal";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ character: string }> }) {
  const { character } = await params;
  const characterData = await getCharacterByName(character);
  return {
    title: characterData.name,
    description: `${characterData.elementText} ${characterData.weaponText} from ${characterData.region}`,
  }
}

export default async function CharacterDetailModal(
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
    <Modal>
      {/* <p>Page of {characterName}</p> */}
      <ElementalProvider elements={elementData}>
        <CharacterDetailPage character={characterData} />
        <div className="p-4 flex justify-center gap-4">
          <Link
            href={`${baseWikiaUrl}${characterData.name.replace(/ /g, "_")}`}
            target="_blank"
            className="px-4 py-2 text-md bg-white/10 rounded-md hover:bg-white/20 transition-colors"
          >
            Wiki
          </Link>
          <a
            href={`/${canonCharacterName}`}
            className="px-4 py-2 text-md bg-white/10 rounded-md hover:bg-white/20 transition-colors"
          >
            Go to page
          </a>
        </div>
      </ElementalProvider>
    </Modal>
  );
}
