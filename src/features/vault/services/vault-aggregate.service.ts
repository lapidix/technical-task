import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { calculateVaultValue, formatVaultAmount } from "../utils";
import { VaultDataService } from "./vault-data.service";

export class VaultAggregateService {
  static async getAllVaultTotalSupply(): Promise<number> {
    const [totalAssetsData, tokenPrices] = await Promise.all([
      VaultDataService.getVaultTotalAssets(),
      VaultDataService.getTokenPrices(),
    ]);

    const total = SUPPORTED_VAULTS.reduce((sum, vault, index) => {
      const totalAssets = totalAssetsData[index];
      const price = tokenPrices[vault.id] || 0;
      const value = calculateVaultValue(totalAssets, vault.decimals, price);
      return sum + value;
    }, 0);

    return total;
  }

  static async getMyTotalSupply(userAddress: `0x${string}`): Promise<number> {
    const [balanceData, tokenPrices] = await Promise.all([
      VaultDataService.getVaultBalances(userAddress),
      VaultDataService.getTokenPrices(),
    ]);

    const total = SUPPORTED_VAULTS.reduce((sum, vault, index) => {
      const balance = balanceData[index];
      const price = tokenPrices[vault.id] || 0;
      const value = calculateVaultValue(balance, vault.decimals, price);
      return sum + value;
    }, 0);

    return total;
  }

  static async getMyTotalAPY(userAddress: `0x${string}`): Promise<number> {
    const [balanceData, aprData] = await Promise.all([
      VaultDataService.getVaultBalances(userAddress),
      VaultDataService.getVaultAPRs(),
    ]);

    const balances = SUPPORTED_VAULTS.map((vault, index) => {
      const balance = balanceData[index];
      return formatVaultAmount(balance, vault.decimals);
    });

    const totalBalance = balances.reduce((sum, balance) => sum + balance, 0);
    if (totalBalance === 0) return 0;

    const weightedAPY = SUPPORTED_VAULTS.reduce((sum, vault, index) => {
      const apr = aprData[index];
      const aprValue = apr ? Number(apr) / 100 : 0;
      const weight = balances[index] / totalBalance;
      return sum + aprValue * weight;
    }, 0);

    return weightedAPY;
  }

  static async getMyVaultsCount(userAddress: `0x${string}`): Promise<number> {
    const balanceData = await VaultDataService.getVaultBalances(userAddress);
    return balanceData.filter((result) => result && Number(result) > 0).length;
  }
}
