'use client';

import { useCallback, useMemo, useState } from "react";
import CharacterStat from "../data/chara-stat";
import Character from "../data/character";
import { mapCharacterCombatScalingData } from "../data/mapper";

export default function CharacterStatCard({ character, characterStat }: { character: Character, characterStat: Record<string, CharacterStat> }) {
  const selectableLevels = [1, 20, 40, 50, 60, 70, 80, 90];
  const [selectedLevel, setSelectedLevel] = useState(selectableLevels[0]);
  const specialtyLabel = useMemo(() => {
    return mapCharacterCombatScalingData(character.substatType)
  }, [characterStat, character])
  if (!characterStat) {
    return null;
  }
  const stat = useMemo(() => {
    return characterStat[selectedLevel.toString() + '+'] || characterStat[selectedLevel.toString()]
  }, [selectedLevel, characterStat]);
  const specialtyStat = useMemo(() => {
    if (character.substatType == "FIGHT_PROP_ELEMENT_MASTERY") {
      return stat.specialized
    } else {
      return (stat.specialized * 100).toFixed(1) + "%";
    }
  }, [selectedLevel, stat, specialtyLabel, characterStat, character]);
  const levelDescription = useCallback((index: number) => {
    return (index > 0 && selectableLevels.length - 1 > index) ? "Ascension " + index : (index > 0) ? "Max Level" : "Base"
  }, [selectableLevels])

  return (
    <div className={`flex flex-col gap-4 p-8 bg-black/40 rounded-xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto my-8`}>
      <h2 className="text-3xl font-bold text-center lg:text-left">Base Stats</h2>

      {/* Level Selector */}
      {/* On mobile, this is a horizontally scrollable list. On larger screens, it wraps and centers. */}
      <div className="flex flex-nowrap overflow-x-auto gap-2 mb-2 pb-2 lg:flex-wrap lg:justify-center"
        style={{ scrollbarWidth: 'none' }}>
        {selectableLevels.map((level, i) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded-md transition-colors text-sm
              ${selectedLevel === level
                ? 'bg-white/30 font-semibold'
                : 'bg-gray-900/40 hover:bg-white/10'
              }`
            }
          >
            <p>Lv. {level}</p>
            <p className="text-xs hidden md:block lg:hidden">
              {(i > 0 && selectableLevels.length - 1 > i) ? "Asc. " + i : (i > 0) ? "Max" : "Base"}
            </p>
            <p className="text-xs hidden lg:block">
              {levelDescription(i)}
            </p>
          </button>
        ))}
      </div>

      <div className="text-2xl text-center mb-2">Level {selectedLevel} ({levelDescription(selectableLevels.indexOf(selectedLevel))})</div>

      {/* Stats Display */}
      {stat && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-lg">
          <StatAttributeField label="HP" value={Math.round(stat.hp)} />
          <StatAttributeField label="ATK" value={Math.round(stat.attack)} />
          <StatAttributeField label="DEF" value={Math.round(stat.defense)} />
          <StatAttributeField label={specialtyLabel || 'Specialty'} value={specialtyStat} />
        </div>
      )}
    </div>
  )
}

function StatAttributeField({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 h-full">
      <div className="flex flex-auto text-5xl font-normal">{value}</div>
      <div className={`flex flex-auto
        ${label.length > 10
          ? 'text-lg sm:text-xl'
          : 'text-2xl'
        }`}>{label}</div>
    </div>
  )
}