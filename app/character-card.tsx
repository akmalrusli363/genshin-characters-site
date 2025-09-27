
import Image from "next/image";
import { useElements } from "@/app/element-context";
import { useContext, useMemo } from "react";
import { ShowRarityCardGlowContext } from "@/app/ui/theme";
import Character from "@/app/data/character";
import Link from "next/link";
import { normalizeSlug } from "./utils/slugify";
import { getUiIconPath } from "./api/constants";

export default function CharacterCard({ character }: { character: Character }) {
  const elements = useElements();

  const elementMapping = character.elementText;
  const elementIcon = elements.find(e => e.name === elementMapping)?.imageBase64 || "";
  const avatarIcon = character.images.filename_icon || "";
  const weaponIconUrl = useMemo(() => {
    switch(character.weaponText) {
      case "Sword": return "/assets/Icon_Sword.png";
      case "Polearm": return "/assets/Icon_Polearm.png";
      case "Claymore": return "/assets/Icon_Claymore.png";
      case "Catalyst": return "/assets/Icon_Catalyst.png";
      case "Bow": return "/assets/Icon_Bow.png";
    }
  }, [character]);
  const enkaAvatarIcon = getUiIconPath(avatarIcon);

  const glowRarity = useContext(ShowRarityCardGlowContext);
  const fourStarGlowRarityClass = 'border-purple-300 bg-purple-300/20';
  const fiveStarGlowRarityClass = 'border-amber-300 bg-amber-300/20';
  const baseCardDecorationClass = 'bg-white/10 border-white/20';
  const glowRarityClass = (glowRarity && character.rarity === 4) ? fourStarGlowRarityClass : (glowRarity && character.rarity === 5) ? fiveStarGlowRarityClass : baseCardDecorationClass;

  return (
    <Link href={`/${normalizeSlug(character.name.toLowerCase())}`} className={`w-[8rem] md:w-[12rem] h-[16rem] md:h-[20rem] border ${glowRarityClass} rounded-xl p-2 sm:p-4 flex flex-col items-center backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-105`}>
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
      <h2 className={"text-xl font-bold mb-2 text-center"}>{character.name}</h2>
      <div className="mb-2">
        <span className="text-sm mr-2">{character.region || "Outworld"}</span>
        <span className="text-sm">{character.rarity}★</span>
      </div>
      <div className="mb-2">
        {elementIcon && <Image src={elementIcon} title={character.elementText} alt={character.elementText} width={48} height={48} className="inline-block w-6 h-6 mr-2" />}
        {weaponIconUrl && <Image src={weaponIconUrl} title={character.weaponText} alt={character.weaponText} width={48} height={48} className="inline-block w-8 h-8" />}
      </div>
      <p className="text-xs sm:text-sm text-center">{character.elementText} - {character.weaponText}</p>
    </Link>
  );
}