"use client";

import { useNumberPadStore } from "@/shared/store";
import { BackSpaceIcon } from "@/shared/ui/icons/common";
import { useEffect, useState } from "react";

export const NumberPad = () => {
  const { isOpen, addDigit, removeDigit } = useNumberPadStore();
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out"
      style={{
        transform: isAnimating ? "translateY(0)" : "translateY(100%)",
      }}
      onClick={(e) => e.stopPropagation()}>
      <div className="border-t border-l border-r border-gray-800 bg-black">
        <div className="grid grid-cols-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map(
            (num) => (
              <button
                key={num}
                onClick={() => addDigit(num)}
                className="text-2xl font-normal py-2.5 active:bg-gray-900 transition-colors border-r border-b border-gray-800 last:border-r-0">
                {num}
              </button>
            )
          )}
          <button
            onClick={removeDigit}
            className="text-3xl font-light py-2.5 active:bg-gray-900 transition-colors flex items-center justify-center border-b border-gray-800">
            <BackSpaceIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
