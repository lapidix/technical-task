import { SUPPORTED_VAULTS, VAULT_ABI } from "@/entities/vault/constants";
import { SupportedVaultId } from "@/entities/vault/types";
import { wagmiConfig } from "@/shared/config/wagmi.config";
import { formatUnits, parseUnits } from "viem";
import { readContract, writeContract } from "wagmi/actions";
import { calculateAPY } from "../utils";

export class VaultTransactionService {
  static async getUserVaultBalance(
    vaultAddress: `0x${string}`,
    userAddress: `0x${string}`,
    decimals: number
  ): Promise<number> {
    try {
      const balance = await readContract(wagmiConfig, {
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: "balanceOf",
        args: [userAddress],
      });

      const balanceString = formatUnits(balance, decimals);
      return Number(balanceString);
    } catch (error) {
      console.error(`Failed to get vault balance for ${vaultAddress}:`, error);
      throw new Error(
        `Failed to fetch vault balance: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async depositToVault(
    vaultAddress: `0x${string}`,
    amount: string,
    decimals: number,
    receiver: `0x${string}`
  ): Promise<`0x${string}`> {
    try {
      const depositAmount = parseUnits(amount, decimals);

      const hash = await writeContract(wagmiConfig, {
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: "deposit",
        args: [depositAmount, receiver],
      });

      return hash;
    } catch (error) {
      console.error(`Failed to deposit ${amount} to vault:`, error);
      throw new Error(
        `Vault deposit failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async withdrawFromVault(
    vaultAddress: `0x${string}`,
    amount: string,
    decimals: number,
    receiver: `0x${string}`
  ): Promise<`0x${string}`> {
    try {
      const withdrawAmount = parseUnits(amount, decimals);

      const hash = await writeContract(wagmiConfig, {
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: "withdraw",
        args: [withdrawAmount, receiver, receiver],
      });

      return hash;
    } catch (error) {
      console.error(`Failed to withdraw ${amount} from vault:`, error);
      throw new Error(
        `Vault withdrawal failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async getVaultAPY(tokenId: SupportedVaultId) {
    try {
      const vault = SUPPORTED_VAULTS.find((v) => v.id === tokenId);
      if (!vault) {
        console.warn(`Vault not found for tokenId: ${tokenId}`);
        return 0;
      }
      const apr = await readContract(wagmiConfig, {
        address: vault.vaultAddress,
        abi: VAULT_ABI,
        functionName: "getAPR",
      });
      return calculateAPY(apr);
    } catch (error) {
      console.error(`Failed to get APY for ${tokenId}:`, error);
      throw new Error(
        `Failed to fetch vault APY: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
