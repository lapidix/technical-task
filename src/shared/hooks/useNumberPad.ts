import { useRef, useState } from "react";

interface UseNumberPadOptions {
  disabled?: boolean;
  maxAmount?: number;
}

export const useNumberPad = (options?: UseNumberPadOptions) => {
  const { disabled = false, maxAmount } = options || {};
  const [amount, setAmount] = useState("0");
  const [showNumberPad, setShowNumberPad] = useState(false);
  const isOpeningRef = useRef(false);

  const NUMBER_PAD_HEIGHT = 213;

  const handleNumberClick = (num: string) => {
    if (disabled) return;
    if (num === ".") {
      if (!amount.includes(".")) {
        const newAmount = amount + num;
        setAmount(newAmount);
      }
    } else {
      const newAmount = amount === "0" ? num : amount + num;
      // Check if new amount exceeds max
      if (maxAmount !== undefined && parseFloat(newAmount) > maxAmount) {
        return;
      }
      setAmount(newAmount);
    }
  };

  const handleBackspace = () => {
    if (disabled) return;
    const newAmount = amount.length > 1 ? amount.slice(0, -1) : "0";
    setAmount(newAmount);
  };

  const handleClear = () => {
    setAmount("0");
  };

  const handleSetAmount = (value: string) => {
    // Check if value exceeds max
    if (maxAmount !== undefined && parseFloat(value) > maxAmount) {
      setAmount(maxAmount.toString());
      return;
    }
    setAmount(value);
  };

  const handleCloseNumberPad = () => {
    if (isOpeningRef.current || !showNumberPad) return;
    setShowNumberPad(false);
  };

  const handleOpenNumberPad = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    isOpeningRef.current = true;
    setShowNumberPad(true);
    setTimeout(() => {
      isOpeningRef.current = false;
    }, 300);
  };

  return {
    amount,
    showNumberPad,
    handleNumberClick,
    handleBackspace,
    handleClear,
    handleSetAmount,
    handleCloseNumberPad,
    handleOpenNumberPad,
    NUMBER_PAD_HEIGHT,
  };
};
