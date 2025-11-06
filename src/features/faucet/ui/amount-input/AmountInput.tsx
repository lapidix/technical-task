"use client";

import { useState } from "react";

interface AmountInputProps {
  amount: string;
  onChange: (amount: string) => void;
  symbol: string;
}

export const AmountInput = ({ amount, onChange, symbol }: AmountInputProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      onChange(value);
    }
    if (Number(value) > 1000) {
      setErrorText(`amount must be less than or equal to 1000 ${symbol}`);
    } else {
      setErrorText(null);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-3">
        Request Amount
      </label>
      <input
        value={amount}
        onChange={handleAmountChange}
        className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
        placeholder="100"
      />

      {errorText ? (
        <p className="text-xs text-red-500 mt-2">{errorText}</p>
      ) : (
        <p className="text-xs text-gray-500 mt-2">
          Maximum 1000 {symbol} can be requested
        </p>
      )}
    </div>
  );
};
