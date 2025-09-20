import { getAllCharacters, getAllElements } from "./api/constants";
import CharacterListPage from "./character-page";

export default async function Home() {
  const [characterData, elementData] = await Promise.all([
    getAllCharacters(),
    getAllElements()
  ])
  characterData.sort((a, b) => a.version.localeCompare(b.version));
  return <CharacterListPage characters={characterData} elements={elementData} />;
}

