import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-900 via-black to-black text-white p-8">
      <h1 className="text-6xl md:text-9xl font-bold text-red-100 mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-white mb-8 text-center">Character Not Found</h2>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-md">
        Oops! It seems the character you are looking for does not exist in Teyvat database, or maybe they live in the another world?
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors duration-300 text-lg"
      >
        Go Back to Home
      </Link>
    </div>
  );
}