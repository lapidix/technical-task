"use client";

import { ErrorIcon } from "@/shared/ui/icons/common/ErrorIcon";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-[#1A1D1A] to-[#0F110F] rounded-2xl p-8 space-y-6 border border-gray-800/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <ErrorIcon className="w-20 h-20 text-red-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-50">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-400 leading-relaxed">
              We&apos;re sorry for the inconvenience. Please try again.
            </p>
          </div>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="bg-black/40 rounded-xl p-4 border border-red-900/20">
            <p className="text-xs text-red-400 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <button
            onClick={reset}
            className="w-full bg-accent hover:bg-accent-hover text-[#1A1D1A] font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-50 font-medium py-3 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
