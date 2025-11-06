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
