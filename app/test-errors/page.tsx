"use client";

import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { ApiErrorFallback } from "@/shared/ui/error-boundary/ApiErrorFallback";
import { DefaultErrorFallback } from "@/shared/ui/error-boundary/DefaultErrorFallback";
import { useState } from "react";

// 에러를 발생시키는 컴포넌트들
const ThrowError = ({ message }: { message: string }) => {
  throw new Error(message);
};

export default function TestErrorsPage() {
  const [errorType, setErrorType] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-50 mb-4">
            Error Pages Test
          </h1>
          <p className="text-gray-400 mb-8">
            Click buttons to test different error scenarios
          </p>
        </div>

        {/* 버튼들 */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setErrorType("default")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Test Default Error
          </button>

          <button
            onClick={() => setErrorType("network")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Test Network Error
          </button>

          <button
            onClick={() => setErrorType("ratelimit")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Test Rate Limit Error
          </button>

          <button
            onClick={() => setErrorType("api")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Test API Error
          </button>

          <button
            onClick={() => setErrorType(null)}
            className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Reset
          </button>
        </div>

        {/* 에러 표시 영역 */}
        <div className="border-2 border-gray-700 rounded-xl p-4">
          {errorType === "default" && (
            <ErrorBoundary
              fallback={(error, reset) => (
                <DefaultErrorFallback error={error} reset={reset} />
              )}>
              <ThrowError message="Something went wrong!" />
            </ErrorBoundary>
          )}

          {errorType === "network" && (
            <ErrorBoundary
              fallback={(error, reset) => (
                <ApiErrorFallback error={error} reset={reset} />
              )}>
              <ThrowError message="Failed to fetch data from network" />
            </ErrorBoundary>
          )}

          {errorType === "ratelimit" && (
            <ErrorBoundary
              fallback={(error, reset) => (
                <ApiErrorFallback error={error} reset={reset} />
              )}>
              <ThrowError message="Error 429: Too many requests, rate limit exceeded" />
            </ErrorBoundary>
          )}

          {errorType === "api" && (
            <ErrorBoundary
              fallback={(error, reset) => (
                <ApiErrorFallback error={error} reset={reset} />
              )}>
              <ThrowError message="API request failed" />
            </ErrorBoundary>
          )}

          {!errorType && (
            <div className="text-center py-12 text-gray-400">
              Select an error type above to test
            </div>
          )}
        </div>

        {/* 전역 에러 페이지 테스트 안내 */}
        <div className="bg-[#1A1D1A] rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-50">
            Test Global Error Pages
          </h2>
          <div className="space-y-2 text-gray-400">
            <p>
              • <strong className="text-gray-50">404 Page:</strong> Visit{" "}
              <a
                href="/non-existent-page"
                className="text-accent hover:underline">
                /non-existent-page
              </a>
            </p>
            <p>
              • <strong className="text-gray-50">Global Error:</strong> Throw an
              error in any page component
            </p>
            <p>
              • <strong className="text-gray-50">Wallet Error:</strong> Throw an
              error in wallet routes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
