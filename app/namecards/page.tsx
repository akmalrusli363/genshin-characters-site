import { getAllNamecards, getUiIconPath } from "@/app/api/constants";
import { notFound } from "next/navigation";
import FloatingBackButton from "@/app/ui/floating-back-button"
import { Suspense } from "react";
import Namecard, { NamecardCategory } from "../data/namecard";
import Image from "next/image";
import { getNamecardCategory } from "./utils";

export default async function Page() {
  const [namecards] = await Promise.all([
    getAllNamecards()
  ])
  if (!namecards) {
    return notFound()
  }
  const namecardData = namecards.map((namecard) => {
    return {...namecard, category: getNamecardCategory(namecard)}
  })
  return (
    <>
      <FloatingBackButton backToHome={true} />
      <Suspense fallback={<p className="text-center p-4rem">Loading namecard data...</p>}>
        <NameCardList namecards={namecardData} />
      </Suspense>
    </>
  );
}

type NamecardProps = Namecard & {category: NamecardCategory}

async function NameCardList(
  { namecards }: { namecards: NamecardProps[] }
) {
  return (
    <div className="">
      <h1 className="text-4xl text-center m-4 mt-6 mb-6">Namecards</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 m-4">
        {namecards.map((namecard) => {
          return (
            <div key={namecard.id}>
              <NameCard key={namecard.id} nameCardData={namecard} />
            </div>
          )
        })}
      </div>
    </div>
  );
}

function NameCard(
  { nameCardData }: { nameCardData: NamecardProps }
) {
  const chip = (
    <div className="rounded-[64px] border border-white/20 text-sm pl-2 pr-2 w-fit h-fit place-self-center" title={nameCardData.source[0] ?? "Unknown source"}>{nameCardData.category}</div>
  )
  return (
    <div className="relative flex rounded-[64px] border border-white/20 justify-between m-1 overflow-hidden hover:shadow-lg hover:scale-105 transition-all">
      {nameCardData.images.filename_banner && (
        <Image 
          src={getUiIconPath(nameCardData.images.filename_banner ?? "/assets/Icon_Unknown.png")}
          alt={nameCardData.name} title={getUiIconPath(nameCardData.images.filename_banner ?? "")}
          width={600} height={120}
          className="absolute inset-0 w-auto h-full object-cover place-self-end" />
      )}
      <div className="relative z-10 flex flex-row pl-4 w-full items-center bg-black/50 rounded-[64px] pr-4">
        <Image src={getUiIconPath(nameCardData.images.filename_icon ?? "/assets/Icon_Unknown.png")} alt={nameCardData.name} width={96} height={64} className="w-5rem h-3rem ml-2 mr-2 transition-all" style={{ objectFit: "contain" }} />
        <div className="flex flex-col w-full gap-1 justify-start text-start mt-2 mb-2 ml-4">
          <div className="flex gap-2">
            <h2 className="text-2xl font-semibold">{nameCardData.name}</h2>
            {chip}
          </div>
          <p className="text-sm line-clamp-2 text-ellipsis">{nameCardData.description}</p>
        </div>
      </div>
    </div>
  )
}
