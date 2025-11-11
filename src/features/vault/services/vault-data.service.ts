import { erc20CoinGeckoApiAdapter } from "@/entities/erc20/api";
import { SUPPORTED_VAULTS, VAULT_ABI } from "@/entities/vault/constants";
import { VaultEntity } from "@/entities/vault/types";
import { wagmiConfig } from "@/shared/config/wagmi.config";
import { readContracts } from "wagmi/actions";
import { formatVaultAmount } from "../utils/vault-calculator";

export class VaultDataService {
  static async getTokenPrices(): Promise<Record<string, number>> {
    try {
      const coingeckoIds = SUPPORTED_VAULTS.map((v) => v.coinGeckoId).join(",");
      const data = await erc20CoinGeckoApiAdapter.fetchMultipleTokenPrices(
        coingeckoIds
      );

      const prices: Record<string, number> = {};
      SUPPORTED_VAULTS.forEach((vault) => {
        const price = data[vault.coinGeckoId]?.usd;
        if (price === undefined) {
          console.warn(`Price not found for ${vault.coinGeckoId}, skipping`);
        } else {
          prices[vault.id] = price;
        }
      });

      return prices;
    } catch (error) {
      console.error("Failed to fetch vault token prices:", error);
      throw new Error(
        `Failed to fetch vault token prices: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async getVaultAPRs(): Promise<(bigint | undefined)[]> {
    try {
      const data = await readContracts(wagmiConfig, {
        contracts: SUPPORTED_VAULTS.map((vault) => ({
          address: vault.vaultAddress,
          abi: VAULT_ABI,
          functionName: "getAPR",
        })),
      });
      return data.map((d) => d.result);
    } catch (error) {
      console.error("Failed to fetch vault APRs:", error);
      return []; // Fallback: allow UI to render with default values
    }
  }

  static async getVaultBalances(
    address: `0x${string}`
  ): Promise<(bigint | undefined)[]> {
    try {
      const data = await readContracts(wagmiConfig, {
        contracts: SUPPORTED_VAULTS.map((vault) => ({
          address: vault.vaultAddress,
          abi: VAULT_ABI,
          functionName: "balanceOf",
          args: [address],
        })),
      });
      return data.map((d) => d.result);
    } catch (error) {
      console.error(`Failed to fetch vault balances for ${address}:`, error);
      return []; // Fallback: allow UI to render with default values
    }
  }

  static async getVaultTotalAssets(): Promise<(bigint | undefined)[]> {
    try {
      const data = await readContracts(wagmiConfig, {
        contracts: SUPPORTED_VAULTS.map((vault) => ({
          address: vault.vaultAddress,
          abi: VAULT_ABI,
          functionName: "totalAssets",
        })),
      });
      return data.map((d) => d.result);
    } catch (error) {
      console.error("Failed to fetch vault total assets:", error);
      return []; // Fallback: allow UI to render with default values
    }
  }

  static async getAllVaultData(
    userAddress?: `0x${string}`
  ): Promise<VaultEntity[]> {
    const [aprData, balanceData, totalAssetsData, tokenPrices] =
      await Promise.all([
        VaultDataService.getVaultAPRs(),
        userAddress ? VaultDataService.getVaultBalances(userAddress) : [],
        VaultDataService.getVaultTotalAssets(),
        VaultDataService.getTokenPrices(),
      ]);

    return SUPPORTED_VAULTS.map((vault, index) => {
      const apr = aprData[index];
      const myBalance = balanceData[index];
      const totalAssets = totalAssetsData[index];

      const totalAssetsValue = formatVaultAmount(totalAssets, vault.decimals);
      const myBalanceValue = formatVaultAmount(myBalance, vault.decimals);

      return {
        ...vault,
        apr: apr ? Number(apr) / 100 : 0,
        myBalance: myBalanceValue,
        totalAssets: totalAssetsValue,
        price: tokenPrices[vault.id] || 0,
      };
    });
  }
}
