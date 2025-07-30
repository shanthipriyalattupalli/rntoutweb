

import Link from 'next/link';
const sad="/Assets/sad.png";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <img src={sad} alt="Sad face" className="w-24 h-24 mb-10" />
      <h1 className="text-7xl font-bold text-[#ef4444] mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-6">
        The page you are attempting to reach is currently not available.
        This may be because the page does not exist or has been moved.  
      </p>
      <Link
        href="/"
        className="bg-[#ef4444] text-white px-6 py-3 rounded-md hover:bg-[#ef4444] transition"
      >
        Go back home
      </Link>
    </div>
  );
}
