import { QueryClient } from "@tanstack/react-query";
import { getErrorMessage, parseError } from "../libs/error-handler.libs";

export const QUERY_STALE_TIME = {
  SHORT: 60 * 1000, // * 1분 - 자주 변하는 데이터
  MEDIUM: 5 * 60 * 1000, // * 5분 - 일반 데이터
  LONG: 30 * 60 * 1000, // * 30분 - 거의 안 변하는 데이터
  INFINITE: Infinity, // * 영구 - 이미지, 정적 리소스
} as const;

export const QUERY_REFETCH_INTERVAL = {
  SHORT: 60 * 1000, // * 1분
  MEDIUM: 5 * 60 * 1000, // * 5분
  LONG: 30 * 60 * 1000, // * 30분
  NEVER: false, // * 자동 refetch 안함
} as const;

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME.MEDIUM,
      retry: (failureCount, error) => {
        const appError = parseError(error);
        // 재시도 불가능한 에러는 즉시 실패
        if (!appError.retryable) {
          return false;
        }
        // 최대 3회 재시도
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      networkMode: "online",
    },
    mutations: {
      retry: false, // Mutation은 기본적으로 재시도 안함
      onError: (error) => {
        console.error("Mutation error:", getErrorMessage(error));
      },
    },
  },
});
