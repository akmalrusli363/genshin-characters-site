import Image from "next/image";
import CharacterConstellationPlaceholder from "./placeholder/character-constellation-placeholder";
import { getCharacterNameCard, getUiIconPath } from "../api/constants";
import Character from "../data/character";

export default async function CharacterFancyCard({ character }: { character: Character }) {
  const characterName = character.name;
  const cFancy = await getCharacterNameCard(characterName) ?? undefined;

  if (!character || !cFancy) {
    // return CharacterConstellationPlaceholder();
    return <p className="text-center text-xl p-8">Character data not available.</p>;
  }

  const fancyNameCardBanner = (
    <div className="flex w-full rounded-[64px] border border-white/20 justify-between">
      <div className="flex flex-row ml-4">
        <Image src={getUiIconPath(character?.images.filename_icon ?? "/assets/Icon_Unknown.png")} alt={characterName} width={64} height={64} className="w-3rem h-3rem ml-2 mr-2 transition-all" style={{ objectFit: "contain" }}/>
        <div className="flex flex-col w-full gap-2 justify-start text-start mt-2 mb-2 ml-4">
          <h2 className="text-2xl font-semibold">{character?.name}</h2>
          <p>{character?.elementText} {character?.weaponText}</p>
        </div>
      </div>
      <Image src={getUiIconPath(cFancy?.images.filename_banner ?? "/assets/Icon_Unknown.png")} alt={characterName} title={getUiIconPath(cFancy?.images.filename_banner ?? "")} width={600} height={96} className="w-16rem h-3rem transition-all" style={{ objectFit: "contain" }}/>
    </div>
  )

  return (
    <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 p-4 md:p-8 bg-black/40 rounded-xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto my-8`}>
      <div className="flex flex-col gap-4 text-center lg:text-left w-full">
        <h2 className={"text-2xl md:text-4xl font-bold"}>{characterName}&apos;s Fancies</h2>
        <div className="flex flex-col lg:justify-start gap-4">
          {fancyNameCardBanner}
          <Image src={getUiIconPath(cFancy?.images.filename_background ?? "/assets/Icon_Unknown.png")} alt={characterName} title={getUiIconPath(cFancy?.images.filename_background ?? "")} width={600} height={128} className="w-10rem h-4rem self-end hover:scale-110 transition-all" style={{ objectFit: "contain" }}/>
          <Image src={getUiIconPath(cFancy?.images.filename_icon ?? "/assets/Icon_Unknown.png")} alt={characterName} title={getUiIconPath(cFancy?.images.filename_icon??"")} width={600} height={128} className="w-10rem h-4rem self-center hover:scale-110 transition-all" style={{ objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}
