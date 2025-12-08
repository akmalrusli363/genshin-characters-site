import React, { useContext, useMemo, useState } from "react";
import Image from "next/image";
import { useElements } from "@/app/element-context";
import { buildPairFieldMappers, ImagePair, pivot } from "@/app/helpers";
import Character from "@/app/data/character"
import Element from "@/app/data/elements";
import { ShowRarityCardGlowContext } from "@/app/ui/theme";
import Link from "next/link";
import { normalizeSlug } from "@/app/utils/slugify";
import { getUiIconPath } from "@/app/api/constants";

const weaponImageMap: Record<string, string> = {
  "Sword": "/assets/Icon_Sword.png",
  "Claymore": "/assets/Icon_Claymore.png",
  "Polearm": "/assets/Icon_Polearm.png",
  "Bow": "/assets/Icon_Bow.png",
  "Catalyst": "/assets/Icon_Catalyst.png",
};

const config: (elements: Element[]) => {
  [key: string]: {
    field: keyof Character;
    label: string;
    mapping: (item: Character) => ImagePair;
  };
} = (elements: Element[]) => {
  return {
    weaponText: {
      field: "weaponText", label: "Weapons", mapping: (c: Character) => ({
        name: c.weaponText,
        imgSrc: weaponImageMap[c.weaponText] || ""
      })
    },
    elementText: {
      field: "elementText", label: "Elements", mapping: (c: Character) => ({
        name: c.elementText,
        imgSrc: elements.find(e => e.name === c.elementText)?.imageBase64 || ""
      })
    },
    region: {
      field: "region", label: "Regions", mapping: (c: Character) => ({
        name: c.region,
        imgSrc: "" // No region images available in data
      })
    }
  }
};

export default function CharacterTableView({ characters }: {
  characters: Character[]
}) {
  const elements = useElements();
  const [tableColumnField, setTableColumnField] = useState("elementText");
  const [tableRowField, setTableRowField] = useState("weaponText");
  const [rarityChecked, setRarityChecked] = useState(false);

  const handleSwap = () => {
    const temp = tableColumnField;
    setTableColumnField(tableRowField);
    setTableRowField(temp);
  };

  const mappers = useMemo(() => {
    return buildPairFieldMappers(characters, config(elements))
  }, [characters, elements]);

  return (
    <section className="items-center justify-items-center lg:mx-16">
      <div className="flex items-center gap-2 md:hidden mb-4">
        Column <SwapIcon /> Row
      </div>
      <div className="flex items-center gap-x-2 md:gap-x-8 gap-y-4 flex-wrap mb-4 justify-center">
        <div className="flex items-center gap-2">
          <label htmlFor="column-selector" className="font-semibold hidden md:block">Columns:</label>
          <select id="column-selector" value={tableColumnField} onChange={e => setTableColumnField(e.target.value)} className="bg-black/40 border border-white/30 rounded px-2 py-1">
            {Object.entries(mappers).map((f, k) => (
              <option key={k} value={f[0]} disabled={f[0] === tableRowField}>
                {f[1].label}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSwap} className="p-2 bg-black/40 border border-white/30 rounded hover:bg-white/20 transition-colors" aria-label="Swap rows and columns">
          <SwapIcon />
        </button>
        <div className="flex items-center gap-2">
          <label htmlFor="row-selector" className="font-semibold hidden md:block">Rows:</label>
          <select id="row-selector" value={tableRowField} onChange={e => setTableRowField(e.target.value)} className="bg-black/40 border border-white/30 rounded px-2 py-1">
            {Object.entries(mappers).map((f, k) => (
              <option key={k} value={f[0]} disabled={f[0] === tableColumnField}>
                {f[1].label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRarityChecked(!rarityChecked)}
            className={`p-2 text-white rounded-full shadow-lg backdrop-blur-sm transition-colors ${rarityChecked ? 'bg-amber-400/50 hover:bg-amber-200/50' : 'bg-gray-700/50 hover:bg-white/20'}`}
            title={`Toggle Rarity Grouping: ${rarityChecked ? 'On' : 'Off'}`}
          >
            Toggle Rarity Grouping
          </button>
        </div>
      </div>
      <div className="w-[85vw] lg:w-auto overflow-x-auto">
        <CharacterTable characters={characters} mappersForTable={mappers} rowSelector={tableRowField} colSelector={tableColumnField} rarityChecked={rarityChecked} />
      </div>
    </section>
  )
}

export function CharacterTable({ characters, mappersForTable, rowSelector, colSelector, rarityChecked }: {
  characters: Character[],
  mappersForTable: { [key: string]: { label: string; values: ImagePair[] } },
  rowSelector: string, colSelector: string, rarityChecked: boolean
}) {
  const characterList = pivot<Character>(characters, rowSelector as keyof Character, colSelector as keyof Character);
  const colSelectorMapper = mappersForTable[colSelector];
  const rowSelectorMapper = mappersForTable[rowSelector];
  const tableHeader = (weapon: string) => {
    const img = colSelectorMapper.values.find(e => e.name === weapon)?.imgSrc
    return (
      <th key={weapon} style={{
        border: "1px solid #ccc", padding: "1rem", textAlign: "center",
        verticalAlign: "middle", justifyItems: "center", justifyContent: "center"
      }}>
        <div>
          {img && <Image src={img} alt={weapon} width={40} height={40} />}
        </div>
        {weapon}
      </th>
    )
  };
  const tableCell = (row: string, col: string) => {
    const charas = characterList[row][col];
    const groupedByRarity = charas?.reduce((acc, curr) => {
      const key = curr.rarity;
      (acc[key] ??= []).push(curr);
      return acc;
    }, {} as Record<number, Character[]>);
    const groupedRarityGrid = (
      <td key={col} style={{
        border: "1px solid #ccc",
        textAlign: "center",
        verticalAlign: "middle",
        gap: "8px",
        height: "100%",
      }}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {groupedByRarity && Object.entries(groupedByRarity)
            ?.sort((a, b) => Number(b[0]) - Number(a[0]))
            ?.map(([rarity, list], idx) => (
              <div
                key={rarity}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "1rem .5rem",
                  gap: "8px",
                  width: "100%",
                  flex: "1",
                  borderTop: idx === 0 ? "none" : "1px solid #ccc6"
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  placeContent: "center",
                  paddingBottom: ".5rem",
                }}>
                  <span style={{ fontWeight: 700 }}>{rarity}★</span>
                </div>

                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  justifyContent: "center"
                }}>
                  {list?.map((char) => (
                    <CharacterCardCell key={char.name} character={char} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </td>
    );
    return rarityChecked ? groupedRarityGrid : (
      <td key={col} style={{
        border: "1px solid #ccc", padding: "1rem 0rem", alignContent: "center",
        textAlign: "center", verticalAlign: "middle", margin: "auto",
        justifyItems: "center", justifyContent: "center"
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
          maxWidth: "240px", /* 3 cards * (64px width + 8px gap) */
          margin: "auto"
        }}>
          {charas && charas.map((char) => (
            <CharacterCardCell key={char.name} character={char} />
          ))}
        </div>
      </td>
    );
  };
  const tableRowLead = (element: string) => {
    const img = rowSelectorMapper.values.find(e => e.name === element)?.imgSrc
    return (
      <td style={{
        border: "1px solid #ccc", padding: "8px", fontWeight: "bold",
        textAlign: "center", verticalAlign: "middle", justifyItems: "center", justifyContent: "center"
      }}>
        <div>
          {img && <Image src={img} alt={element} width={40} height={40} />}
        </div>
        {element}
      </td>
    )
  }

  return (
    <table style={{ height: "100%", borderCollapse: "collapse", margin: "auto" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>
            {colSelectorMapper.label} <br />---------<br /> {rowSelectorMapper.label}
          </th>
          {colSelectorMapper.values.map((weapon) => tableHeader(weapon.name))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(characterList)
          .filter((element) => element?.toLowerCase() !== "none" && element !== "" && element !== "undefined")
          .map((element) => (
            <tr key={element}>
              {tableRowLead(element)}
              {colSelectorMapper.values.map((weapon) => (
                tableCell(element, weapon.name)
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function CharacterCardCell({ character }: { character: Character }) {
  const glowMode = useContext(ShowRarityCardGlowContext);
  const fourStarGlowClass = 'drop-shadow-[0_0_0.4rem_theme(colors.purple.600)]';
  const fiveStarGlowClass = 'drop-shadow-[0_0_0.4rem_theme(colors.amber.600)]';
  const glowRarityClass = (glowMode && character.rarity === 4) ? fourStarGlowClass : (glowMode && character.rarity === 5) ? fiveStarGlowClass : '';
  const characterImageUrl = character?.images?.filename_iconCard ?? "";
  return (
    <Link href={`${normalizeSlug(character.name.toLowerCase())}`} className="flex flex-col items-center w-16">
      {characterImageUrl && <Image
        src={characterImageUrl ? getUiIconPath(characterImageUrl) : "/assets/Icon_Unknown.png"}
        alt={character ? character.name : "No Character"}
        width={64}
        height={64}
        className={`w-16 h-16 shadow-md hover:scale-110 transition-all ${glowRarityClass}`}
        style={{ objectFit: "contain" }}
        title={character ? character.name : "-"}
      />}
      <p className="text-xs text-center mt-1">
        {character ? character.name : "-"}
      </p>
    </Link>
  );
}

const SwapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5" />
  </svg>
);
