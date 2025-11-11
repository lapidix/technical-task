import { TX_CONFIG } from "@/shared/constants";
import { useCallback, useEffect, useRef, useState } from "react";
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

  // options를 ref로 관리하여 의존성 문제 해결
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const { isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash: currentHash,
    confirmations: TX_CONFIG.CONFIRMATIONS,
    pollingInterval: TX_CONFIG.POLLING_INTERVAL,
    timeout: TX_CONFIG.TIMEOUT,
  });

  const resetState = useCallback(() => {
    setIsExecuting(false);
    setCurrentHash(undefined);
    setCurrentStep(0);
    setSteps([]);
  }, []);

  const executeNextStep = useCallback(
    async (nextStep: number, currentSteps: TransactionStep[]) => {
      try {
        const hash = await currentSteps[nextStep]();
        setCurrentHash(hash);
        setCurrentStep(nextStep);
      } catch (error) {
        resetState();
        optionsRef.current?.onError?.(error as Error);
      }
    },
    [resetState]
  );

  useEffect(() => {
    if (!isSuccess || !currentHash) return;

    const handleSuccess = async () => {
      const nextStep = currentStep + 1;

      if (nextStep >= steps.length) {
        resetState();
        optionsRef.current?.onSuccess?.();
        return;
      }

      await executeNextStep(nextStep, steps);
    };

    handleSuccess();
  }, [isSuccess, currentHash, currentStep, steps, resetState, executeNextStep]);

  useEffect(() => {
    if (!isError || !error) return;

    resetState();
    optionsRef.current?.onError?.(error as Error);
  }, [isError, error, resetState]);

  const execute = async (transactionSteps: TransactionStep[]) => {
    if (isExecuting) {
      console.warn("Transaction already in progress");
      return;
    }

    setIsExecuting(true);
    setSteps(transactionSteps);
    setCurrentStep(0);

    try {
      const hash = await transactionSteps[0]();
      setCurrentHash(hash);
    } catch (error) {
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
