
export default function CharacterTalentPlaceholder() {
  return (
    <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 p-4 md:p-8 bg-black/40 rounded-xl border border-white/20 backdrop-blur-sm max-w-4xl mx-auto my-8 animate-pulse`}>
      <div className="flex flex-col gap-4 text-center lg:text-left w-full">
        <div className="h-8 bg-gray-700 rounded-md w-1/2 mb-4 mx-auto lg:mx-0"></div>

        <div className="flex flex-col lg:justify-start gap-4">
          <div className="h-6 bg-gray-700 rounded-md w-1/4 mb-2"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-row gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto"></div>
              </div>
              <div className="flex flex-col w-full gap-2 justify-start text-start">
                <div className="h-5 bg-gray-700 rounded-md w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-md w-full"></div>
                <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
              </div>
            </div>
          ))}
          <div className="h-6 bg-gray-700 rounded-md w-1/3 mb-2 mt-4"></div>
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex flex-row gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto"></div>
              </div>
              <div className="flex flex-col w-full gap-2 justify-start text-start">
                <div className="h-5 bg-gray-700 rounded-md w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded-md w-full"></div>
                <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}