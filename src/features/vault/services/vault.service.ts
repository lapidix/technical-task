import { vaultApiAdapter } from "@/entities/vault/api";
import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { wagmiConfig } from "@/shared/config/wagmi.config";
import { VAULT_ABI } from "@/shared/constants/abis.const";
import { readContracts } from "wagmi/actions";

export class VaultService {
  static async getTokenPrices(): Promise<Record<string, number>> {
    const coingeckoIds = SUPPORTED_VAULTS.map((v) => v.coinGeckoId).join(",");
    const data = await vaultApiAdapter.fetchTokenPrices(coingeckoIds);

    const prices: Record<string, number> = {};
    SUPPORTED_VAULTS.forEach((vault) => {
      if (data[vault.coinGeckoId]) {
        prices[vault.id] = data[vault.coinGeckoId].usd;
      }
    });

    return prices;
  }

  static async getVaultAPRs() {
    return readContracts(wagmiConfig, {
      contracts: SUPPORTED_VAULTS.map((vault) => ({
        address: vault.vaultAddress,
        abi: VAULT_ABI,
        functionName: "getAPR",
      })),
    });
  }

  static async getVaultBalances(address: `0x${string}`) {
    return readContracts(wagmiConfig, {
      contracts: SUPPORTED_VAULTS.map((vault) => ({
        address: vault.vaultAddress,
        abi: VAULT_ABI,
        functionName: "balanceOf",
        args: [address],
      })),
    });
  }

  static async getVaultTotalAssets() {
    return readContracts(wagmiConfig, {
      contracts: SUPPORTED_VAULTS.map((vault) => ({
        address: vault.vaultAddress,
        abi: VAULT_ABI,
        functionName: "totalAssets",
      })),
    });
  }
}
