import { getAllCharacters, getAllElements } from "@/app/api/constants";
import { ElementalProvider } from "@/app/element-context";
import CharacterListPage from "./character-page";

export default async function Home() {
  const [characterData, elementData] = await Promise.all([
    getAllCharacters(),
    getAllElements()
  ])
  if (!characterData || !elementData) {
    return <p className="center text-center text-2xl w-screen p-8 h-screen">No characters found</p>;
  } 

  return (
    <ElementalProvider elements={elementData}>
      <CharacterListPage characters={characterData} />
    </ElementalProvider>
  );
}
