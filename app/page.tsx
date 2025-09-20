'use client';

import { useState, useEffect, useRef } from "react";
import { getUnique } from "./helpers";
import CharacterTableView from "./character-table";
import CharacterCard from "./character-card";
import Character from "./data/character"
import Element from './data/elements';
import { getAllCharacters, getAllElements } from "./api/constants";

export default function Home() {
  // State for filters
  const [region, setRegion] = useState("");
  const [element, setElement] = useState("");
  const [weapon, setWeapon] = useState("");
  const [search, setSearch] = useState("");
  const [numToShow, setNumToShow] = useState(12);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateNumToShow = () => {
      if (!cardContainerRef.current) return;

      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const minMdWidth = 768;
      const isMd = window.innerWidth >= minMdWidth;
      const cardWidth = (isMd? 12 : 8) * rootFontSize; // w-[15rem] -> 240px at 16px base
      const cardHeight = 16 * rootFontSize; // h-[20rem] -> 320px at 16px base
      const gap = 1.5 * rootFontSize; // gap-6 -> 1.5rem

      const availableWidth = cardContainerRef.current.clientWidth;
      const availableHeight = cardContainerRef.current.clientHeight;

      const cardsPerRow = Math.max(1, Math.floor((availableWidth + gap) / (cardWidth + gap)));
      const rows = Math.max(3, Math.floor((availableHeight + gap) / (cardHeight + gap)));
      const cappedRows = Math.min(rows, 4);
      const totalCards = cardsPerRow * cappedRows;

      setNumToShow(Math.min(totalCards, 16));
    };

    calculateNumToShow();
    window.addEventListener('resize', calculateNumToShow);
    return () => window.removeEventListener('resize', calculateNumToShow);
  }, []);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [elements, setElements] = useState<Element[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      getAllCharacters(),
      getAllElements()
    ]).then(([characterData, elementData]) => {
        characterData.sort((a, b) => a.version.localeCompare(b.version));
        setCharacters(characterData);
        setElements(elementData);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="center text-center text-2xl font-bold w-screen p-8 h-screen">Loading…</p>;
  if (error) return <p className="center text-center text-2xl w-screen p-8 h-screen">Error: {error}</p>;
  if (!characters) return <p className="center text-center text-2xl w-screen p-8 h-screen">No characters found</p>;

  // Get unique options
  const regions = getUnique(characters, "region") as string[];
  const uniqueElements = getUnique(characters, "elementText") as string[];
  const weapons = getUnique(characters, "weaponText") as string[];

  // Filter characters based on selection
  const filteredCharacters = characters
    .filter(c => c.name)
    .filter(c =>
      (!region || c.region === region) &&
      (!element || c.elementText === element) &&
      (!weapon || c.weaponText === weapon) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase()))
    )
    .slice(0, numToShow);

  return (
    <div className="font-sans grid grid-rows-[1fr_auto] min-h-screen justify-items-center bg-gradient-to-b from-blue-900 via-black to-black text-white">
      <main className="w-full p-8 flex flex-col">
        <header className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl mb-4">Genshin Characters</h1>
          <div className="text-l">Fetched from <i><u>genshin-db-api.vercel.app</u></i></div>
        </header>

        <section className="md:ph-24 w-full lg:w-auto">
          <div className="flex flex-wrap gap-4 mb-8">
            <select value={region} onChange={e => setRegion(e.target.value)} className="bg-black/40 border border-white/30 rounded px-2 py-1 flex-grow lg:flex-grow-0">
              <option value="">All Regions</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={element} onChange={e => setElement(e.target.value)} className="bg-black/40 border border-white/30 rounded px-2 py-1 flex-grow lg:flex-grow-0">
              <option value="">All Elements</option>
              {uniqueElements.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <select value={weapon} onChange={e => setWeapon(e.target.value)} className="bg-black/40 border border-white/30 rounded px-2 py-1 flex-grow lg:flex-grow-0">
              <option value="">All Weapons</option>
              {weapons.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-black/40 border border-white/30 rounded px-2 py-1 flex-grow w-full lg:w-auto"
            />
          </div>

          <div ref={cardContainerRef} className="flex gap-6 flex-wrap justify-center flex-grow">
            {filteredCharacters.map((character: any, idx: number) =>
              <CharacterCard key={character.id || idx} character={character} elements={elements} />
            )}
          </div>

          <div className="mt-8 text-sm text-white/50 text-center">
            Showing {filteredCharacters.length} of {characters.filter(c => c.name).length} characters.
          </div>
        </section>

        <section className="ph-24">
          <h2 className="text-3xl font-bold text-center mt-8 mb-8">Character table</h2>
          <div className="mt-8 w-full lg:w-auto">
            {/* <div className="overflow-x-auto  w-full lg:w-auto"> */}
            <CharacterTableView characters={characters} elements={elements} />
            {/* </div> */}
          </div>
        </section>
      </main>
      <footer className="flex w-full items-center justify-center gap-[24px] p-8 flex-wrap">
        Built using Next.js
      </footer>
    </div>
  );
}
