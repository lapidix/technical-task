import { ERC20_QUERY_KEYS } from "@/entities/erc20/constants";
import { QUERY_STALE_TIME } from "@/shared/config";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ERC20Service } from "../services";

export const useTokenUsdPrice = (coinGeckoId: string) => {
  const { data: price, refetch: refetchPrice } = useSuspenseQuery({
    queryKey: ERC20_QUERY_KEYS.tokenPrice(coinGeckoId),
    queryFn: async () => {
      return ERC20Service.getTokenPrice(coinGeckoId);
    },
    staleTime: QUERY_STALE_TIME.SHORT, // 1분간 캐시 유지
    refetchInterval: QUERY_STALE_TIME.SHORT, // 1분마다 자동 갱신
  });

  return {
    price,
    refetchPrice,
  };
};
