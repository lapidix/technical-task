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
    <div className="px-2 py-2">
      <label className="block text-sm font-medium text-[#8C938C] mb-3">
        Request Amount
      </label>
      <input
        type="text"
        value={amount}
        onChange={handleAmountChange}
        className="w-full bg-transparent text-[#ECEFEC] text-2xl font-medium rounded-lg px-4 py-3 border border-[#3A3D3A] focus:border-[#E6F5AA] focus:outline-none"
        placeholder="100"
      />

      {errorText ? (
        <p className="text-xs text-red-500 mt-2">{errorText}</p>
      ) : (
        <p className="text-xs text-[#8C938C] mt-2">
          Maximum 1000 {symbol} can be requested
        </p>
      )}
    </div>
  );
};
