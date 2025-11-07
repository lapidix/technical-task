"use client";

import { VaultBase } from "@/entities/vault/types";
import { useState } from "react";
import { SupplyForm } from "./SupplyForm";
import { WithdrawForm } from "./WithdrawForm";

interface VaultFormProps {
  vault: VaultBase;
}

export const VaultForm = ({ vault }: VaultFormProps) => {
  const [mode, setMode] = useState<"supply" | "withdraw">("supply");

  return (
    <div className="flex-1 flex flex-col">
      {/* Mode Tabs */}
      <div className="px-6 py-4">
        <div className="flex gap-2 bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => setMode("supply")}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${
              mode === "supply"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}>
            Supply
          </button>
          <button
            onClick={() => setMode("withdraw")}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${
              mode === "withdraw"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}>
            Withdraw
          </button>
        </div>
      </div>

      {/* Render appropriate form based on mode */}
      {mode === "supply" ? (
        <SupplyForm vault={vault} />
      ) : (
        <WithdrawForm vault={vault} />
      )}
    </div>
  );
};
