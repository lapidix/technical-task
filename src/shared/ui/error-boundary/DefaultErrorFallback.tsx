import { WarningIcon } from "@/shared/ui/icons/toast/WarningIcon";

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

export const DefaultErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-[#1A1D1A] to-[#0F110F] rounded-2xl p-8 space-y-6 border border-gray-800/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <WarningIcon className="w-16 h-16 text-orange-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-50">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              {error.message || "An unexpected error occurred"}
            </p>
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full bg-accent hover:bg-accent-hover text-[#1A1D1A] font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
          Try Again
        </button>
      </div>
    </div>
  );
};
