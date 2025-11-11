"use client";

import { VaultBase } from "@/entities/vault/types";
import { Suspense, useState } from "react";
import { DepositSection, VaultModeTab, WithdrawSection } from "./components";
import { VaultContainerSkeleton } from "./VaultContainerSkeleton";

interface VaultContainerProps {
  vault: VaultBase;
}

export const VaultContainer = ({ vault }: VaultContainerProps) => {
  const [mode, setMode] = useState<"supply" | "withdraw">("supply");

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <VaultModeTab mode={mode} onModeChange={setMode} />
      <div className="flex-1 flex flex-col min-h-0">
        <Suspense fallback={<VaultContainerSkeleton />}>
          {mode === "supply" ? (
            <DepositSection vault={vault} />
          ) : (
            <WithdrawSection vault={vault} />
          )}
        </Suspense>
      </div>
    </div>
  );
};
