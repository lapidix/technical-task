import {
  ClockIcon,
  ShieldExclamationIcon,
  SignalSlashIcon,
} from "@/shared/ui/icons/common";

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

export const ApiErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  const isNetworkError =
    error.message.includes("fetch") || error.message.includes("network");
  const isRateLimitError =
    error.message.includes("429") || error.message.includes("rate limit");

  const IconComponent = isNetworkError
    ? SignalSlashIcon
    : isRateLimitError
    ? ClockIcon
    : ShieldExclamationIcon;

  const iconColorClass = isNetworkError
    ? "text-red-400"
    : isRateLimitError
    ? "text-orange-400"
    : "text-gray-400";

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-[#1A1D1A] to-[#0F110F] rounded-2xl p-8 space-y-6 border border-gray-800/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <IconComponent className={`w-16 h-16 ${iconColorClass}`} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-50">
              {isNetworkError
                ? "Network Error"
                : isRateLimitError
                ? "Too Many Requests"
                : "API Error"}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isNetworkError
                ? "Please check your internet connection"
                : isRateLimitError
                ? "Please wait a moment and try again"
                : error.message}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={reset}
            className="w-full bg-accent hover:bg-accent-hover text-[#1A1D1A] font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
            Retry
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-50 font-medium py-3 rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};
