"use client";

import { ToastIcon } from "@/shared/ui/icons/toast";
import { useEffect } from "react";
import { ToastType } from "../../types";

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const Toast = ({
  id,
  message,
  type,
  onClose,
  duration = 10000,
  action,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const styles = {
    SUCCESS: {
      bg: "bg-zinc-900/95",
      text: "text-zinc-100",
      icon: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
      border: "border border-emerald-500/20",
    },
    ERROR: {
      bg: "bg-zinc-900/95",
      text: "text-zinc-100",
      icon: "text-rose-400",
      iconBg: "bg-rose-500/10",
      border: "border border-rose-500/20",
    },
    INFO: {
      bg: "bg-zinc-900/95",
      text: "text-zinc-100",
      icon: "text-blue-400",
      iconBg: "bg-blue-500/10",
      border: "border border-blue-500/20",
    },
    WARNING: {
      bg: "bg-zinc-900/95",
      text: "text-zinc-100",
      icon: "text-amber-400",
      iconBg: "bg-amber-500/10",
      border: "border border-amber-500/20",
    },
  }[type];

  return (
    <div
      className={`${styles.bg} ${styles.border} backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg px-4 py-3 w-full max-w-sm mb-2 animate-slide-in-right`}>
      <div className="flex items-start gap-3">
        <div
          className={`${styles.iconBg} ${styles.icon} flex-shrink-0 rounded-lg p-2`}>
          <ToastIcon icon={type} className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
          <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <p
              className={`${styles.text} text-sm font-medium whitespace-pre-line leading-snug break-words`}>
              {message}
            </p>
          </div>
          {action && (
            <button
              onClick={() => {
                action.onClick();
                onClose(id);
              }}
              className="mt-3 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 text-xs font-semibold rounded-md border border-blue-500/30 transition-all duration-200 hover:border-blue-500/50 active:scale-95 flex-shrink-0">
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className={`${styles.text} opacity-50 hover:opacity-100 transition-opacity flex-shrink-0 -mt-0.5`}
          aria-label="Close">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
