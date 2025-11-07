import { ERC20_QUERY_KEYS } from "@/entities/erc20/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ERC20Service } from "../services";

export const useTokenUsdPrice = (coinGeckoId: string) => {
  const { data: price, refetch: refetchPrice } = useSuspenseQuery({
    queryKey: ERC20_QUERY_KEYS.tokenPrice(coinGeckoId),
    queryFn: async () => {
      return ERC20Service.getTokenPrice(coinGeckoId);
    },
    staleTime: 1000 * 60, // 1분간 캐시 유지
    refetchInterval: 1000 * 60, // 1분마다 자동 갱신
  });

  return {
    price,
    refetchPrice,
  };
};
