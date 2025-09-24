'use client'

import { useState, useEffect, useRef, use, useMemo } from "react";
import { getUnique } from "@/app/helpers";
import CharacterTableView from "@/app/character-table";
import CharacterCard from "@/app/character-card";
import Character from "@/app/data/character"
import { useElements } from "@/app/element-context";
import { ShowRarityCardGlowContext } from "@/app/ui/theme";

export default function CharacterListPage({ characters }: {
  characters: Character[]
}) {
  if (!characters) return <p className="center text-center text-2xl w-screen p-8 h-screen">No characters found</p>;

  const [glowMode, setGlowMode] = useState(false);

  return (
    <div className="font-sans grid grid-rows-[1fr_auto] min-h-screen justify-items-center bg-gradient-to-b from-blue-900 via-black to-black text-white">
      <main className="w-full p-8 flex flex-col">
        <header className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl mb-4">Genshin Characters</h1>
          <div className="text-l">Fetched from <i><u>genshin-db-api.vercel.app</u></i></div>
        </header>

        <section className="flex justify-center mb-8 items-center">
          <div>Glow mode: &nbsp;</div>
          <div className="flex rounded-lg border border-white/30 overflow-hidden">
            <button
              onClick={() => setGlowMode(true)}
              className={`px-4 py-2 transition-colors ${glowMode ? 'bg-white/20' : 'bg-black/40 hover:bg-white/10'}`}
            >
              On
            </button>
            <button
              onClick={() => setGlowMode(false)}
              className={`px-4 py-2 transition-colors ${!glowMode ? 'bg-white/20' : 'bg-black/40 hover:bg-white/10'}`}
            >
              Off
            </button>
          </div>
        </section>

        <ShowRarityCardGlowContext value={glowMode}>
          <CharacterCardCollection characters={characters} />
        </ShowRarityCardGlowContext>

        <section className="ph-24">
          <h2 className="text-3xl font-bold text-center mt-8 mb-8">Character table</h2>
          <div className="mt-8 w-full lg:w-auto">
            <ShowRarityCardGlowContext value={glowMode}>
              <CharacterTableView characters={characters} />
            </ShowRarityCardGlowContext>
          </div>
        </section>
      </main>
      <footer className="flex w-full items-center justify-center gap-[24px] p-8 flex-wrap">
        Built using Next.js
      </footer>
    </div>
  );
}

function CharacterCardCollection({ characters }: {
  characters: Character[]
}) {
  const elements = useElements();

  // State for filters
  const [region, setRegion] = useState("");
  const [element, setElement] = useState("");
  const [weapon, setWeapon] = useState("");
  const [rarity, setRarity] = useState(0);
  const [search, setSearch] = useState("");
  const [numToShow, setNumToShow] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateNumToShow = () => {
      if (!cardContainerRef.current) return;

      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const minMdWidth = 768;
      const isMd = window.innerWidth >= minMdWidth;
      const cardWidth = (isMd ? 12 : 8) * rootFontSize; // w-[15rem] -> 240px at 16px base
      const cardHeight = (isMd ? 20 : 16) * rootFontSize; // h-[20rem] -> 320px at 16px base
      const gap = 1.5 * rootFontSize; // gap-6 -> 1.5rem

      const availableWidth = cardContainerRef.current.clientWidth;
      const availableHeight = cardContainerRef.current.clientHeight;

      const cardsPerRow = Math.max(1, Math.floor((availableWidth + gap) / (cardWidth + gap)));
      const rows = Math.max(2, Math.floor((availableHeight + gap) / (cardHeight + gap)));
      const cappedRows = Math.min(rows, 4);
      const totalCards = cardsPerRow * cappedRows;

      setNumToShow(Math.min(totalCards, 16));
    };

    calculateNumToShow();
    window.addEventListener('resize', calculateNumToShow);
    return () => window.removeEventListener('resize', calculateNumToShow);
  }, []);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [region, element, weapon, search]);

  // Get unique options
  const regions = useMemo(() => getUnique(characters, "region"), [characters]);
  const uniqueElements = useMemo(() => getUnique(characters, "elementText"), [characters]);
  const weapons = useMemo(() => getUnique(characters, "weaponText"), [characters]);
  const rarities = useMemo(() => getUnique(characters, "rarity"), [characters]);

  // Filter characters based on selection
  const allFilteredCharacters = useMemo(() => {
    return characters
    .filter(c => c.name)
    .filter(c =>
      (!region || c.region === region) &&
      (!element || c.elementText === element) &&
      (!weapon || c.weaponText === weapon) &&
      (!rarity || c.rarity === rarity) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase()))
    )
  }, [characters, region, element, weapon, rarity, search]);

  const totalPages = Math.ceil(allFilteredCharacters.length / numToShow) || 1;
  const paginatedCharacters = allFilteredCharacters.slice((currentPage - 1) * numToShow, currentPage * numToShow);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
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
        <select value={rarity} onChange={e => setRarity(parseInt(e.target.value))} className="bg-black/40 border border-white/30 rounded px-2 py-1 flex-grow lg:flex-grow-0">
          <option value="0">All ★</option>
          {rarities.map(r => <option key={r} value={r}>{r}</option>)}
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
        {paginatedCharacters.map((character: any, idx: number) =>
          <CharacterCard key={character.id || idx} character={character} />
        )}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <div className="mt-8 text-sm text-white/50 text-center">
        Showing {paginatedCharacters.length} of {allFilteredCharacters.length} characters.
      </div>
    </section>
  )
}

function PaginationControls({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers: (number | string)[] = [];
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-black/40 border border-white/30 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {renderPageNumbers()?.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-white/30' : 'bg-black/40'} border border-white/30`}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-black/40 border border-white/30 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
