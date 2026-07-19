'use client';
import { useState, useRef } from "react";
import { getUiNamecardIconPath, getUiNamecardPath } from "../api/constants";
import Namecard, { NamecardCategory, namecardCategories } from "../data/namecard";
import Image from "next/image";

type NamecardProps = Namecard & { category: NamecardCategory }

export function NameCardListClient(
  { namecards }: { namecards: NamecardProps[] }
) {
  const [search, setSearch] = useState("");
  const [groupedByCategory, setGroupByCategory] = useState(false);
  const [activeCategories, setActiveCategories] = useState<Set<NamecardCategory>>(new Set(namecardCategories));

  const resetCategory = () => {
    setActiveCategories(new Set(namecardCategories));
  };

  const toggleCategory = (category: NamecardCategory) => {
    setActiveCategories(prev => {
      let newCategories = new Set(prev);
      if (newCategories.has(category) && newCategories.size > 1) {
        newCategories.delete(category);
      } else if (newCategories.has(category) && newCategories.size === 1) {
        newCategories = new Set(namecardCategories);
      } else {
        newCategories.add(category);
      }
      return newCategories;
    });
  };

  const filteredAndSortedNamecards = namecards.filter(
    nc => activeCategories.has(nc.category) && nc.name.toLowerCase().includes(search.toLowerCase())
  )//.sort((a, b) => namecardCategories.indexOf(a.category) - namecardCategories.indexOf(b.category));

  const grouped = filteredAndSortedNamecards.reduce((acc, curr) => {
    (acc[curr.category] ??= []).push(curr);
    return acc;
  }, {} as Record<string, NamecardProps[]>);

  const sortFilterSearchPanel = (
    <div className="m-4">
      <div className="flex grow w-full lg:w-auto gap-4">
        <div className="bg-black/40 border border-white/30 rounded px-2 py-1 flex items-center grow">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-2 py-1 grow w-auto"
          >
          </input>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="bg-black/40 border border-white/30 rounded px-2 py-1 flex items-center gap-2 hover:bg-white/20 transition-colors"
              title="Clear search"
            >
              &#x2715;
            </button>
          )}
        </div>
      </div>
    </div>
  )
  const CategorizeIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 7h13v10H2V4h7l2 2H4v9h1V7z" />
      </svg>
    )
  }
  const ResetIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
      </svg>
    )
  }
  const chipList = (
    <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
      {namecardCategories.map((category) => {
        const isActive = activeCategories.has(category);
        return (
          <button key={category} onClick={() => toggleCategory(category)} className={`rounded-[64px] border text-sm pl-3 pr-3 pt-1 pb-1 w-fit h-fit place-self-center transition-colors ${isActive ? 'bg-white/90 text-black border-white/90' : 'border-white/20 bg-black/30 text-white/80 hover:bg-white/10'}`} title={category}>{category}</button>
        )
      })}
      <button key="reset" onClick={() => resetCategory()} className={`rounded-[64px] border text-sm pl-3 pr-3 pt-1 pb-1 w-fit h-fit place-self-center transition-colors bg-white/90 text-black border-white/90 flex items-center gap-1`} title="reset">
        <ResetIcon /><span>Reset</span>
      </button>
    </div>
  )
  return (
    <div className="pb-8">
      <h1 className="text-4xl text-center m-4 mt-6 mb-6">Namecards</h1>
      <button key="reset" onClick={() => setGroupByCategory(!groupedByCategory)} className={`rounded-[64px] border text-sm pl-3 pr-3 pt-1 pb-1 w-fit h-fit place-self-center transition-colors flex items-center gap-1 ${groupedByCategory ? 'bg-white/90 text-black border-white/90' : 'border-white/20 bg-black/30 text-white/80 hover:bg-white/10'}`} title="toggle-group">
        <CategorizeIcon /><span>Categorize</span>
      </button>
      {sortFilterSearchPanel}
      {chipList}
      {groupedByCategory ? (
        <div>
          { Object.entries(grouped).map(([s, e]) => <NameCardGroup namecards={e} label={s} key={s} />)}
        </div>
      ) : <NameCardGroup namecards={filteredAndSortedNamecards} />}
    </div>
  );
}

function NameCardGroup(
  { namecards, label }: { namecards: NamecardProps[], label?: string }
) {
  return <div>
    {label && <h3 className="text-2xl text-center m-4">{label[0].toUpperCase() + label.slice(1)}</h3>}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 m-4">
      {namecards.map((namecard) => {
        return <NameCard key={namecard.id} nameCardData={namecard} />
      })}
    </div>
  </div>
}

function NameCard(
  { nameCardData }: { nameCardData: NamecardProps }
) {
  const Chip = (text: string, tooltip: string) => (
    <div className="rounded-[64px] border border-white/20 text-sm pl-2 pr-2 w-fit h-fit place-self-center" title={tooltip}>{text}</div>
  )
  return (
    <div className="relative flex rounded-[64px] border border-white/20 justify-between m-1 overflow-hidden hover:shadow-lg hover:scale-102 transition-all duration-300">
      {nameCardData.images.filename_banner && (
        <Image
          src={getUiNamecardPath(nameCardData.images.filename_banner ?? "/assets/Icon_Unknown.png")}
          alt={nameCardData.name} title={getUiNamecardPath(nameCardData.images.filename_banner ?? "")}
          width={600} height={120}
          className="absolute inset-0 w-auto h-full object-cover place-self-end" />
      )}
      <div className="relative z-10 flex flex-row pl-4 w-full items-center bg-black/50 rounded-[64px] pr-4">
        <Image src={getUiIconPath(nameCardData.images.filename_icon ?? "/assets/Icon_Unknown.png")} alt={nameCardData.name} width={96} height={64} className="w-5rem h-3rem ml-2 mr-2 transition-all shrink-0" style={{ objectFit: "contain" }} />
        <div className="flex flex-col w-full gap-1 justify-start text-start mt-2 mb-2 ml-4">
          <div className="flex gap-2">
            <h2 className="text-2xl font-semibold">{nameCardData.name}</h2>
            {Chip(nameCardData.category, nameCardData.source[0] ?? "Unknown source")}
            {nameCardData.version && Chip(`v${nameCardData.version}`, `Released at version ${nameCardData.version}`)}
          </div>
          <p className="text-sm line-clamp-2 text-ellipsis">{nameCardData.description}</p>
        </div>
      </div>
    </div>
  )
}
