'use client';

import Image from "next/image";
import Character from "@/app/data/character";
import { useElements } from "@/app/element-context";
import { useEffect, useState } from "react";
import { getUiIconPath } from "../api/constants";

export default function CharacterDetailPage({ character }: { character: Character }) {
  const elements = useElements();

  const [characterBirthday, setCharacterBirthday] = useState(character.birthday);
  
  useEffect(() => {
    const birthdayDate = new Date(character.birthday);
    birthdayDate.setFullYear(2020);
    const birthday = birthdayDate.toLocaleDateString(undefined, {month:'long',day:'numeric'});
    setCharacterBirthday(birthday);
  }, [character]);

  if (!character) {
    return <p className="text-center text-xl p-8">Character data not available.</p>;
  }

  const weaponMapping = character.weaponText;
  const elementMapping = character.elementText;
  const elementIcon = elements.find(e => e.name === elementMapping)?.imageBase64 || "";
  const avatarIcon = character.images.filename_gachaSplash || character.images.filename_icon || "";
  let weaponIconUrl = "";
  switch (weaponMapping) {
    case "Sword": weaponIconUrl = "/assets/Icon_Sword.png"; break;
    case "Polearm": weaponIconUrl = "/assets/Icon_Polearm.png"; break;
    case "Claymore": weaponIconUrl = "/assets/Icon_Claymore.png"; break;
    case "Catalyst": weaponIconUrl = "/assets/Icon_Catalyst.png"; break;
    case "Bow": weaponIconUrl = "/assets/Icon_Bow.png"; break;
    default: weaponIconUrl = "";
  }
  const enkaAvatarIcon = getUiIconPath(avatarIcon);

  return (
    <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8 bg-black/40 rounded-xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto my-8`}>
      <div className="relative w-64 h-64 flex-shrink-0">
        <Image
          src={enkaAvatarIcon}
          alt={character.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center", display: "block" }}
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-4 text-center lg:text-left">
        <h2 className={"text-4xl font-bold"}>{character.name}</h2>

        <div className="flex items-center justify-center lg:justify-start gap-4">
          <span className="text-lg">{character.rarity}★</span>
          {elementIcon && (
            <Image src={elementIcon} alt={character.elementText} width={32} height={32} className="inline-block" />
          )}
          <span className="text-lg">{character.elementText}</span>
          {weaponIconUrl && (
            <Image src={weaponIconUrl} alt={character.weaponText} width={36} height={36} className="inline-block" />
          )}
          <span className="text-lg">{character.weaponText}</span>
        </div>

        <p className="text-lg">
          <span className="font-semibold">Region:</span> {character.region || "Outworld"}
          <span className="font-semibold ml-4">Constellation:</span> {character.constellation || "-"}
        </p>
        
        {character.birthdaymmdd && (
          <p className="text-lg">
            <span className="font-semibold">Birthday:</span> {characterBirthday} ({character.birthdaymmdd})
          </p>
        )}

        {character.description && (
          <div className="mt-4">
            <h3 className="text-2xl font-semibold mb-2">Description</h3>
            <p className="text-base leading-relaxed">
              {character.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
