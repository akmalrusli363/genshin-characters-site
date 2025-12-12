import { getAllNamecards, getUiIconPath } from "@/app/api/constants";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getNamecardCategory } from "./utils";
import FloatingBackButton from "@/app/ui/floating-back-button";
import { NameCardListClient } from "./PageComponent";

export default async function Page() {
  const namecards = await getAllNamecards();

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
        {/* Pass the pre-fetched and processed namecardData to the client component */}
        <NameCardListClient namecards={namecardData} />
      </Suspense>
    </>
  );
}

