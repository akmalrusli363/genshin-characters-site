
export default function CharacterStatPlaceholder() {
  return (
    <div className={`flex flex-col gap-4 p-8 bg-black/40 rounded-xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto my-8 animate-pulse`}>
      <div className="h-8 bg-gray-700 rounded-md w-1/2 mx-auto mb-4"></div>

      {/* Level Selector Placeholder */}
      <div className="flex flex-nowrap overflow-x-auto gap-2 mb-2 pb-2 py-2 lg:flex-wrap sm:justify-center">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="px-4 py-2 rounded-md bg-gray-700 h-12 w-24"></div>
        ))}
      </div>

      <div className="h-6 bg-gray-700 rounded-md w-1/4 mx-auto mb-2"></div>

      {/* Stats Display Placeholder */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-lg">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center gap-2 h-full">
            <div className="h-10 bg-gray-700 rounded-md w-3/4 mb-2"></div>
            <div className="h-5 bg-gray-700 rounded-md w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}