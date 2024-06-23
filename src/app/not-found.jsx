
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 lg:p-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-2xl md:text-3xl font-medium mb-8">Page Not Found</p>
          <p className="text-lg mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600">
              Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
