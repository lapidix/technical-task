import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

type TransactionStep = () => Promise<`0x${string}`>;

interface useSequentialTransactionsOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const TX_CONFIG = {
  CONFIRMATIONS: 1,
  POLLING_INTERVAL: 1000,
  TIMEOUT: 60_000,
  RETRY_DELAY: 100,
} as const;

export const useSequentialTransactions = (
  options?: useSequentialTransactionsOptions
) => {
  const [currentHash, setCurrentHash] = useState<`0x${string}` | undefined>();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TransactionStep[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const { isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash: currentHash,
    confirmations: TX_CONFIG.CONFIRMATIONS,
    pollingInterval: TX_CONFIG.POLLING_INTERVAL,
    timeout: TX_CONFIG.TIMEOUT,
  });

  const resetState = () => {
    setIsExecuting(false);
    setCurrentHash(undefined);
    setCurrentStep(0);
    setSteps([]);
  };

  const executeNextStep = async (nextStep: number) => {
    console.log(`[Sequential TX] Starting step ${nextStep}...`);
    try {
      const hash = await steps[nextStep]();
      console.log(`[Sequential TX] Step ${nextStep} hash received: ${hash}`);
      setCurrentHash(hash);
      setCurrentStep(nextStep);
    } catch (error) {
      console.error(`[Sequential TX] Step ${nextStep} failed:`, error);
      resetState();
      options?.onError?.(error as Error);
    }
  };

  useEffect(() => {
    if (!isSuccess || !currentHash) return;

    const handleSuccess = async () => {
      const nextStep = currentStep + 1;
      console.log(
        `[Sequential TX] Step ${currentStep} completed. Hash: ${currentHash}`
      );

      if (nextStep >= steps.length) {
        console.log(`[Sequential TX] All steps completed successfully`);
        resetState();
        options?.onSuccess?.();
        return;
      }

      await executeNextStep(nextStep);
    };

    handleSuccess();
  }, [isSuccess, currentHash]);

  useEffect(() => {
    if (!isError || !error) return;

    console.error(
      `[Sequential TX] Transaction error at step ${currentStep}:`,
      error
    );
    resetState();
    options?.onError?.(error as Error);
  }, [isError, error, currentStep]);

  const execute = async (transactionSteps: TransactionStep[]) => {
    if (isExecuting) {
      console.warn("Transaction chain already executing, resetting state...");
      resetState();
      await new Promise((resolve) =>
        setTimeout(resolve, TX_CONFIG.RETRY_DELAY)
      );
    }

    setIsExecuting(true);
    setSteps(transactionSteps);
    setCurrentStep(0);

    console.log(
      `[Sequential TX] Starting transaction chain with ${transactionSteps.length} steps`
    );

    try {
      const hash = await transactionSteps[0]();
      console.log(`[Sequential TX] Step 0 hash received: ${hash}`);
      setCurrentHash(hash);
    } catch (error) {
      console.error(`[Sequential TX] Step 0 failed:`, error);
      resetState();
      options?.onError?.(error as Error);
    }
  };

  return {
    execute,
    isExecuting,
    currentStep,
    totalSteps: steps.length,
  };
};
