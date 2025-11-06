import { QueryClient } from "@tanstack/react-query";

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      networkMode: "online",
    },
    mutations: {
      networkMode: "online",
    },
  },
});
export const QUERY_STALE_TIME = {
  SHORT: 60 * 1000, // * 1분 - 자주 변하는 데이터 (가격 등)
  MEDIUM: 5 * 60 * 1000, // * 5분 - 일반 데이터
  LONG: 30 * 60 * 1000, // * 30분 - 거의 안 변하는 데이터
  INFINITE: Infinity, // * 영구 - 이미지, 정적 리소스
} as const;
