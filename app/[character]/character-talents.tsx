'use client';

import { useElements } from "@/app/element-context";
import Talents, { CombatData } from "../data/talents";
import { getUiIconPath } from "../api/constants";
import Image from "next/image";

export default function CharacterTalents({ talents }: { talents: Talents }) {
  const elements = useElements();

  if (!talents) {
    return <p className="text-center text-xl p-8">Character data not available.</p>;
  }

  return (
    <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8 bg-black/40 rounded-xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto my-8`}>
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <h2 className={"text-4xl font-bold"}>Talents</h2>

        <div className="flex flex-col lg:justify-start gap-4">
          <span className="text-xl">Combats</span>
          <TalentCard talent={talents.combat1} imagePath={talents.images.filename_combat1} />
          <TalentCard talent={talents.combat2} imagePath={talents.images.filename_combat2} />
          <TalentCard talent={talents.combat3} imagePath={talents.images.filename_combat3} />
          <span className="text-xl">Ascension Passives (Extra Talents)</span>
          <TalentCard talent={talents.passive1} imagePath={talents.images.filename_passive1} />
          <TalentCard talent={talents.passive2} imagePath={talents.images.filename_passive2} />
          <span className="text-xl">Utility Passives</span>
          {talents.passive3 &&
            <TalentCard talent={talents.passive3} imagePath={talents.images.filename_passive3} />}
          {talents.passive4 &&
            <TalentCard talent={talents.passive4} imagePath={talents.images.filename_passive4} />}
        </div>
      </div>
    </div>
  );
}

function TalentCard({ talent, imagePath }: { talent: CombatData, imagePath: string | undefined }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-1/9 grow-0 flex-col shrink-0 break-words break-all justify-center gap-2">
        {imagePath && <Image
          src={imagePath ? getUiIconPath(imagePath) : "/assets/placeholder.png"}
          alt={talent ? talent.name : "No talent"}
          width={80}
          height={80}
          className="w-4rem h-4rem self-center hover:scale-110 transition-all"
          style={{ objectFit: "contain" }}
          title={talent ? talent.name : "-"}
        />}
      </div>
      <div className="flex flex-col w-full gap-2 justify-start text-start">
        <p className="text-lg font-semibold mb-2">{talent.name}</p>
        <p className="text-base leading-relaxed">{talent.description}</p>
      </div>
    </div>
  );
};
