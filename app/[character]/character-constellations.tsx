'use client';

import { getUiIconPath } from "../api/constants";
import Image from "next/image";
import Constellations, { ConstellationDetail } from "../data/constellations";
import CharacterConstellationPlaceholder from "./placeholder/character-constellation-placeholder";

export default function CharacterConstellations({ constellations, constellationName }: { constellations: Constellations, constellationName?: string }) {
  if (!constellations) {
    return CharacterConstellationPlaceholder();
  }

  return (
    <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 p-4 md:p-8 bg-black/40 rounded-xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto my-8`}>
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <h2 className={"text-2xl md:text-4xl font-bold"}>Constellations {constellationName && <i>({constellationName})</i>}</h2>
        <div className="flex flex-col lg:justify-start gap-4">
          <ConstellationCard constellation={constellations.c1} />
          <ConstellationCard constellation={constellations.c2} />
          <ConstellationCard constellation={constellations.c3} />
          <ConstellationCard constellation={constellations.c4} />
          <ConstellationCard constellation={constellations.c5} />
          <ConstellationCard constellation={constellations.c6} />
          </div>
      </div>
    </div>
  );
}

function ConstellationCard({ constellation }: { constellation: ConstellationDetail }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="w-4rem justify-center content-center self-center gap-2">
        <p className="text-xl md:text-2xl font-semibold text-center">{constellation.level}</p>
      </div>
      <div className="flex flex-1/9 grow-0 flex-col shrink-0 break-words break-all justify-center gap-2">
        {constellation.imagePath && <Image
          src={constellation.imagePath ? getUiIconPath(constellation.imagePath) : "/assets/Icon_Unknown.png"}
          alt={constellation.name ? constellation.name : "No constellation image"}
          width={80}
          height={80}
          className="w-4rem h-4rem self-center hover:scale-110 transition-all"
          style={{ objectFit: "contain" }}
          title={constellation ? constellation.name : "-"}
        />}
      </div>
      <div className="flex flex-col w-full gap-2 justify-start text-start">
        <p className="text-lg font-semibold mb-2">{constellation.name}</p>
        <p className="text-base leading-relaxed">{constellation.description}</p>
      </div>
    </div>
  );
};
