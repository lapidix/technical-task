import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-50">404</h1>
          <h2 className="text-2xl font-medium text-gray-50">Page Not Found</h2>
        </div>
        <p className="text-gray-400">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-accent hover:bg-accent-hover text-[#1A1D1A] font-medium rounded-lg transition-colors">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
