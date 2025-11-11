import Link from "next/link";

export const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-50">500</h1>
          <h2 className="text-2xl font-medium text-gray-50">
            Something Went Wrong
          </h2>
        </div>
        <p className="text-gray-400">
          We&apos;re sorry, but something unexpected happened. Please try again
          later.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3  bg-accent hover:bg-accent-hover text-[#1A1D1A] font-medium rounded-lg transition-colors">
            Reload Page
          </button>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent hover:bg-accent-hover text-[#1A1D1A] font-medium rounded-lg transition-colors">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};
