import { getAllCharacters, getAllElements } from "./api/constants";
import CharacterListPage from "./character-page";
import { ElementalProvider } from "./element-context";

export default async function Home() {
  const [characterData, elementData] = await Promise.all([
    getAllCharacters(),
    getAllElements()
  ])
  characterData.sort((a, b) => a.version.localeCompare(b.version));
  return (
    <ElementalProvider elements={elementData}>
      <CharacterListPage characters={characterData} />
    </ElementalProvider>
  );
}

