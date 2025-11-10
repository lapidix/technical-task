import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

type TransactionStep = () => Promise<`0x${string}`>;

interface useSequentialTransactionsOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSequentialTransactions = (
  options?: useSequentialTransactionsOptions
) => {
  const [currentHash, setCurrentHash] = useState<`0x${string}` | undefined>();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TransactionStep[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // 현재 트랜잭션 상태 추적
  const { isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash: currentHash,
    confirmations: 1,
    pollingInterval: 1000,
    timeout: 60_000, // 60 seconds timeout
  });

  useEffect(() => {
    if (isSuccess && currentHash) {
      const executeNext = async () => {
        const nextStep = currentStep + 1;
        console.log(
          `[Sequential TX] Step ${currentStep} completed. Hash: ${currentHash}`
        );

        if (nextStep >= steps.length) {
          // 모든 단계 완료
          console.log(`[Sequential TX] All steps completed successfully`);
          setIsExecuting(false);
          setCurrentHash(undefined);
          setCurrentStep(0);
          setSteps([]);
          options?.onSuccess?.();
          return;
        }

        // 다음 단계 실행
        console.log(`[Sequential TX] Starting step ${nextStep}...`);
        try {
          const hash = await steps[nextStep]();
          console.log(
            `[Sequential TX] Step ${nextStep} hash received: ${hash}`
          );
          setCurrentHash(hash);
          setCurrentStep(nextStep);
        } catch (error) {
          console.error(`[Sequential TX] Step ${nextStep} failed:`, error);
          setIsExecuting(false);
          setCurrentHash(undefined);
          setCurrentStep(0);
          setSteps([]);
          options?.onError?.(error as Error);
        }
      };

      executeNext();
    }
  }, [isSuccess, currentHash]);

  useEffect(() => {
    if (isError && error) {
      console.error(
        `[Sequential TX] Transaction error at step ${currentStep}:`,
        error
      );
      // Clean up state on error
      const cleanup = () => {
        setIsExecuting(false);
        setCurrentHash(undefined);
        setCurrentStep(0);
        setSteps([]);
      };

      cleanup();
      options?.onError?.(error as Error);
    }
  }, [isError, error, currentStep]);

  const execute = async (transactionSteps: TransactionStep[]) => {
    if (isExecuting) {
      console.warn("Transaction chain already executing, resetting state...");
      // Force reset if stuck
      setIsExecuting(false);
      setCurrentHash(undefined);
      setCurrentStep(0);
      setSteps([]);
      // Wait a bit before retrying
      await new Promise((resolve) => setTimeout(resolve, 100));
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
      setIsExecuting(false);
      setCurrentHash(undefined);
      setSteps([]);
      setCurrentStep(0);
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
