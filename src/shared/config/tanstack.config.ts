import { QueryClient } from "@tanstack/react-query";

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      // 초기 로딩 최적화
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // 네트워크 요청 최적화
      networkMode: "online",
    },
    mutations: {
      // 뮤테이션 최적화
      networkMode: "online",
    },
  },
});
