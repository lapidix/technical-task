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
  });

  useEffect(() => {
    if (isSuccess && currentHash) {
      const executeNext = async () => {
        const nextStep = currentStep + 1;

        if (nextStep >= steps.length) {
          // 모든 단계 완료
          setIsExecuting(false);
          setCurrentHash(undefined);
          setCurrentStep(0);
          setSteps([]);
          options?.onSuccess?.();
          return;
        }

        // 다음 단계 실행
        try {
          const hash = await steps[nextStep]();
          setCurrentHash(hash);
          setCurrentStep(nextStep);
        } catch (error) {
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
      setIsExecuting(false);
      setCurrentHash(undefined);
      setCurrentStep(0);
      setSteps([]);
      options?.onError?.(error as Error);
    }
  }, [isError, error]);

  const execute = async (transactionSteps: TransactionStep[]) => {
    if (isExecuting) {
      throw new Error("Transaction chain already executing");
    }

    setIsExecuting(true);
    setSteps(transactionSteps);
    setCurrentStep(0);

    try {
      const hash = await transactionSteps[0]();
      setCurrentHash(hash);
    } catch (error) {
      setIsExecuting(false);
      setSteps([]);
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
