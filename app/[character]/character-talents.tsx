'use client';

import Talents, { CombatData } from "../data/talents";
import { getUiIconPath } from "../api/constants";
import Image from "next/image";

enum TalentCategories {
  NORMAL = "Normal Attack",
  SKILL = "Elemental Skill",
  BURST = "Elemental Burst",
  PASSIVE = "Passive",
}

export default function CharacterTalents({ talents }: { talents: Talents }) {

  if (!talents) {
    return <p className="text-center text-xl p-8">Character data not available.</p>;
  }

  return (
    <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 p-4 md:p-8 bg-black/40 rounded-xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto my-8`}>
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <h2 className={"text-4xl font-bold"}>Talents</h2>

        <div className="flex flex-col lg:justify-start gap-4">
          <span className="text-xl underline lg:no-underline underline-offset-8">Combats</span>
          <TalentCard talent={talents.combat1} imagePath={talents.images.filename_combat1} type={TalentCategories.NORMAL} />
          <TalentCard talent={talents.combat2} imagePath={talents.images.filename_combat2} type={TalentCategories.SKILL} />
          <TalentCard talent={talents.combat3} imagePath={talents.images.filename_combat3} type={TalentCategories.BURST} />
          <span className="text-xl underline lg:no-underline underline-offset-8">Ascension Passives (Extra Talents)</span>
          <TalentCard talent={talents.passive1} imagePath={talents.images.filename_passive1} type={TalentCategories.PASSIVE} />
          <TalentCard talent={talents.passive2} imagePath={talents.images.filename_passive2} type={TalentCategories.PASSIVE} />
          <span className="text-xl underline lg:no-underline underline-offset-8">Utility Passives</span>
          {talents.passive3 &&
            <TalentCard talent={talents.passive3} imagePath={talents.images.filename_passive3} type={TalentCategories.PASSIVE} />}
          {talents.passive4 &&
            <TalentCard talent={talents.passive4} imagePath={talents.images.filename_passive4} type={TalentCategories.PASSIVE} />}
        </div>
      </div>
    </div>
  );
}

function TalentCard({ talent, imagePath, type }: { talent: CombatData, imagePath: string | undefined, type: TalentCategories }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-1/9 grow-0 flex-col shrink-0 break-words break-all justify-center gap-2">
        <Image
          src={imagePath ? getUiIconPath(imagePath) : "/assets/Icon_Unknown.png"}
          alt={talent ? talent.name : "No talent"}
          width={80}
          height={80}
          className="w-4rem h-4rem self-center hover:scale-110 transition-all"
          style={{ objectFit: "contain" }}
          title={talent ? talent.name : "-"}
        />
      </div>
      <div className="flex flex-col w-full gap-2 justify-start text-start">
        <p className="text-lg font-semibold mb-2">{talent?.name ?? `Unknown ${type}`}</p>
        <p className="text-base leading-relaxed">{talent?.description ?? "No description available."}</p>
      </div>
    </div>
  );
};
