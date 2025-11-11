import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-8xl font-bold text-accent">404</div>
        <h1 className="text-3xl font-bold text-gray-50">Page Not Found</h1>
        <p className="text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-accent hover:bg-accent-hover text-[#1A1D1A] font-medium px-8 py-3 rounded-lg transition-colors">
          Go to Home
        </Link>
      </div>
    </div>
  );
};
