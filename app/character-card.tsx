
import Image from "next/image";
import { useElements } from "./element-context";

export default function CharacterCard({ character }: { character: any }) {
  const elements = useElements();

  const weaponMapping = character.weaponText;
  const elementMapping = character.elementText;
  const elementIcon = elements.find(e => e.name === elementMapping)?.imageBase64 || "";
  const avatarIcon = character.images.filename_icon || "";
  let weaponIconUrl = ""
  switch(weaponMapping) {
    case "Sword": weaponIconUrl = "/assets/Icon_Sword.png";
    case "Polearm": weaponIconUrl = "/assets/Icon_Polearm.png";
    case "Claymore": weaponIconUrl = "/assets/Icon_Claymore.png";
    case "Catalyst": weaponIconUrl = "/assets/Icon_Catalyst.png";
    case "Bow": weaponIconUrl = "/assets/Icon_Bow.png";
  }
  const enkaAvatarIcon = "https://enka.network/ui/" + avatarIcon + ".png";
  return (
    <div className="w-[8rem] md:w-[12rem] h-[16rem] md:h-[20rem] bg-white/10 border border-white/20 rounded-xl p-2 sm:p-4 flex flex-col items-center backdrop-blur-sm">
      <div className="relative w-full h-[6rem] md:h-[12rem] mb-4">
        <Image
          src={enkaAvatarIcon}
          alt={character.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain", objectPosition: "center", display: "block" }}
          className="rounded-lg"
        />
      </div>
      <h2 className="text-xl font-bold mb-2">{character.name}</h2>
      <div className="mb-2">
        <span className="text-sm mr-2">{character.region || "Outworld"}</span>
        <span className="text-sm">{character.rarity}★</span>
      </div>
      <div className="mb-2">
        {elementIcon && <img src={elementIcon} alt={character.elementText} className="inline-block w-6 h-6 mr-2" />}
        {weaponIconUrl && <img src={weaponIconUrl} alt={character.weaponText} className="inline-block w-8 h-8" />}
      </div>
      <p className="text-xs sm:text-sm text-center">{character.elementText} - {character.weaponText}</p>
    </div>
  );
}