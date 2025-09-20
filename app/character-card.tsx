
import Image from "next/image";
import elements from "./elements.customization.json";

export default function CharacterCard({ character }: { character: any }) {
  let weaponMapping = character.weaponText;
  let weaponIconUrl = (weaponMapping === "Claymore") ? "/assets/Icon_Claymore.png" :
    (weaponMapping === "Bow") ? "/assets/Icon_Bow.png" :
      (weaponMapping === "Polearm") ? "/assets/Icon_Polearm.png" :
        (weaponMapping === "Catalyst") ? "/assets/Icon_Catalyst.png" :
          (weaponMapping === "Sword") ? "/assets/Icon_Sword.png" : "";
  let elementMapping = character.elementText;
  let elementIcon = elements.find(e => e.name === elementMapping)?.images.base64 || "";
  let avatarIcon = character.images.filename_icon || "";
  let enkaAvatarIcon = "https://enka.network/ui/" + avatarIcon + ".png";
  return (
    <div className="w-[8rem] md:w-[12rem] h-[16rem] bg-white/10 border border-white/20 rounded-xl p-2 sm:p-4 flex flex-col items-center backdrop-blur-sm">
      <div className="relative w-full h-[6rem] md:h-[10rem] mb-4">
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
        <span className="text-sm mr-2">{character.rarity}★</span>
      </div>
      <div className="mb-2">
        {elementIcon && <img src={elementIcon} alt={character.elementText} className="inline-block w-6 h-6 mr-2" />}
        {weaponIconUrl && <img src={weaponIconUrl} alt={character.weaponText} className="inline-block w-8 h-8 mr-2" />}
      </div>
      <p className="text-xs sm:text-sm text-center">{character.elementText} - {character.weaponText}</p>
    </div>
  );
}