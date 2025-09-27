import { getAllCharacters, getAllElements } from "@/app/api/constants";
import CharacterListPage from "@/app/character-page";
import { ElementalProvider } from "@/app/element-context";

export default async function Home() {
  const [characterData, elementData] = await Promise.all([
    getAllCharacters(),
    getAllElements()
  ])
  if (!characterData || !elementData) {
    return <p className="center text-center text-2xl w-screen p-8 h-screen">No characters found</p>;
  } 

  characterData?.sort((a, b) => a.version.localeCompare(b.version));
  return (
    <ElementalProvider elements={elementData}>
      <CharacterListPage characters={characterData} />
    </ElementalProvider>
  );
}

