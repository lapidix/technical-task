import { erc20CoinGeckoApiAdapter } from "@/entities/erc20/api";
import { SUPPORTED_VAULTS, VAULT_ABI } from "@/entities/vault/constants";
import { SupportedVaultId, VaultEntity } from "@/entities/vault/types";
import { wagmiConfig } from "@/shared/config/wagmi.config";

import { formatUnits, parseUnits } from "viem";
import { readContract, readContracts, writeContract } from "wagmi/actions";

export class VaultService {
  // *LMG
  private static async getTokenPrices(): Promise<Record<string, number>> {
    try {
      const coingeckoIds = SUPPORTED_VAULTS.map((v) => v.coinGeckoId).join(",");
      const data = await erc20CoinGeckoApiAdapter.fetchMultipleTokenPrices(
        coingeckoIds
      );

      const prices: Record<string, number> = {};
      SUPPORTED_VAULTS.forEach((vault) => {
        if (data[vault.coinGeckoId]) {
          prices[vault.id] = data[vault.coinGeckoId].usd;
        }
      });

      return prices;
    } catch (error) {
      console.error("Error fetching token prices:", error);
      throw error;
    }
  }

  /**
   * Get total supply value across all vaults from contract
   */
  // *LMG
  static async getAllVaultTotalSupply(): Promise<number> {
    // 1. Get total assets from contracts
    const totalAssetsData = await VaultService.getVaultTotalAssets();

    // 2. Get token prices
    const tokenPrices = await VaultService.getTokenPrices();

    // 3. Calculate total value
    const total = SUPPORTED_VAULTS.reduce((sum, vault, index) => {
      const totalAssets = totalAssetsData[index];
      const price = tokenPrices[vault.id] || 0;
      const totalAssetsValue = totalAssets
        ? Number(totalAssets) / Math.pow(10, vault.decimals)
        : 0;
      return sum + totalAssetsValue * price;
    }, 0);

    return total;
  }

  // *LMG

  static async getMyTotalSupply(userAddress: `0x${string}`): Promise<number> {
    // 1. Get user balances from contracts
    const balanceData = await VaultService.getVaultBalances(userAddress);

    // 2. Get token prices
    const tokenPrices = await VaultService.getTokenPrices();

    // 3. Calculate total value
    const total = SUPPORTED_VAULTS.reduce((sum, vault, index) => {
      const balance = balanceData[index];
      const price = tokenPrices[vault.id] || 0;
      const balanceValue = balance
        ? Number(balance) / Math.pow(10, vault.decimals)
        : 0;
      return sum + balanceValue * price;
    }, 0);

    return total;
  }

  // *LMG

  static async getMyTotalAPY(userAddress: `0x${string}`): Promise<number> {
    // 1. Get user balances from contracts
    const balanceData = await VaultService.getVaultBalances(userAddress);

    // 2. Get APRs from contracts
    const aprData = await VaultService.getVaultAPRs();

    // 3. Calculate balances and total
    const balances = SUPPORTED_VAULTS.map((vault, index) => {
      const balance = balanceData[index];
      return balance ? Number(balance) / Math.pow(10, vault.decimals) : 0;
    });

    const totalBalance = balances.reduce((sum, balance) => sum + balance, 0);
    if (totalBalance === 0) return 0;

    // 4. Calculate weighted APY
    const weightedAPY = SUPPORTED_VAULTS.reduce((sum, vault, index) => {
      const apr = aprData[index];
      const aprValue = apr ? Number(apr) / 100 : 0;
      const weight = balances[index] / totalBalance;
      return sum + aprValue * weight;
    }, 0);

    return weightedAPY;
  }

  // *LMG
  static async getMyVaultsCount(userAddress: `0x${string}`): Promise<number> {
    const balanceData = await VaultService.getVaultBalances(userAddress);
    return balanceData.filter((result) => result && Number(result) > 0).length;
  }

  static async getAllVaultData(): Promise<VaultEntity[]> {
    const aprData = await VaultService.getVaultAPRs();

    const totalAssetsData = await VaultService.getVaultTotalAssets();

    const tokenPrices = await VaultService.getTokenPrices();

    return SUPPORTED_VAULTS.map((vault, index) => {
      const apr = aprData[index];
      const totalAssets = totalAssetsData[index];

      const decimals = vault.decimals;
      const totalAssetsValue = totalAssets
        ? Number(totalAssets) / Math.pow(10, decimals)
        : 0;

      return {
        ...vault,
        apr: apr ? Number(apr) / 100 : 0,
        myBalance: 0, // No user data
        totalAssets: totalAssetsValue,
        price: tokenPrices[vault.id] || 0,
      };
    });
  }

  // ! 이거 나중에 내 볼트 리스트에서 사용 예정
  /**
   * Get vault list data with user balances
   * @param userAddress - User wallet address (optional)
   * @returns Vault data with token prices and user balances
   */
  static async getVaultListData(
    userAddress?: `0x${string}`
  ): Promise<VaultEntity[]> {
    // 1. Get APRs from contracts
    const aprData = await VaultService.getVaultAPRs();

    // 2. Get user balances (if address provided)
    const balanceData = userAddress
      ? await VaultService.getVaultBalances(userAddress)
      : [];

    // 3. Get total assets
    const totalAssetsData = await VaultService.getVaultTotalAssets();

    // 4. Get token prices
    const tokenPrices = await VaultService.getTokenPrices();

    // 5. Combine all data
    return SUPPORTED_VAULTS.map((vault, index) => {
      const apr = aprData[index];
      const myBalance = balanceData[index];
      const totalAssets = totalAssetsData[index];

      const decimals = vault.decimals;
      const totalAssetsValue = totalAssets
        ? Number(totalAssets) / Math.pow(10, decimals)
        : 0;
      const myBalanceValue = myBalance
        ? Number(myBalance) / Math.pow(10, decimals)
        : 0;

      return {
        ...vault,
        apr: apr ? Number(apr) / 100 : 0,
        myBalance: myBalanceValue,
        totalAssets: totalAssetsValue,
        price: tokenPrices[vault.id] || 0,
      };
    });
  }

  // * LMG
  static async getUserVaultBalance(
    vaultAddress: `0x${string}`,
    userAddress: `0x${string}`,
    decimals: number
  ): Promise<number> {
    const balance = await readContract(wagmiConfig, {
      address: vaultAddress,
      abi: VAULT_ABI,
      functionName: "balanceOf",
      args: [userAddress],
    });

    const balanceString = formatUnits(balance, decimals);
    console.log("balanceString VaultService", balance);
    return Number(balanceString);
  }

  // *LMG
  static async depositToVault(
    vaultAddress: `0x${string}`,
    amount: string,
    decimals: number,
    receiver: `0x${string}`
  ): Promise<`0x${string}`> {
    const depositAmount = parseUnits(amount, decimals);

    const hash = await writeContract(wagmiConfig, {
      address: vaultAddress,
      abi: VAULT_ABI,
      functionName: "deposit",
      args: [depositAmount, receiver],
    });

    return hash;
  }

  // *LMG
  static async withdrawFromVault(
    vaultAddress: `0x${string}`,
    amount: string,
    decimals: number,
    receiver: `0x${string}`
  ): Promise<`0x${string}`> {
    const withdrawAmount = parseUnits(amount, decimals);

    const hash = await writeContract(wagmiConfig, {
      address: vaultAddress,
      abi: VAULT_ABI,
      functionName: "withdraw",
      args: [withdrawAmount, receiver],
    });

    return hash;
  }

  static async getVaultAPY(tokenId: SupportedVaultId) {
    const vault = SUPPORTED_VAULTS.find((v) => v.id === tokenId);
    if (!vault) return 0;
    const apr = await readContracts(wagmiConfig, {
      contracts: [
        {
          address: vault.vaultAddress,
          abi: VAULT_ABI,
          functionName: "getAPR",
        },
      ],
    });
    const aprBps = Number(apr[0].result) / 10000;
    const apy = Math.pow(1 + aprBps / 365, 365) - 1;
    console.log("apy in Service", apy);
    return apy;
  }

  private static async getVaultAPRs(): Promise<(bigint | undefined)[]> {
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
      console.error("Error fetching vault APRs:", error);
      return [];
    }
  }

  private static async getVaultBalances(
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
      console.error("Error fetching vault balances:", error);
      return [];
    }
  }

  private static async getVaultTotalAssets(): Promise<(bigint | undefined)[]> {
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
      console.error("Error fetching total assets:", error);
      return [];
    }
  }
}
