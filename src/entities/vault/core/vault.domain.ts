import { VaultEntity } from "../types/vault.types";

export class VaultDomain implements VaultEntity {
  constructor(
    public id: string,
    public name: string,
    public symbol: string,
    public tokenAddress: `0x${string}`,
    public vaultAddress: `0x${string}`,
    public decimals: number,
    public apr: number,
    public totalAssets: number,
    public myBalance: number,
    public price: number
  ) {}

  static create(params: {
    id: string;
    name: string;
    symbol: string;
    tokenAddress: `0x${string}`;
    vaultAddress: `0x${string}`;
    decimals: number;
    apr: number;
    totalAssets: number;
    myBalance: number;
    price: number;
  }): VaultDomain {
    return new VaultDomain(
      params.id,
      params.name,
      params.symbol,
      params.tokenAddress,
      params.vaultAddress,
      params.decimals,
      params.apr,
      params.totalAssets,
      params.myBalance,
      params.price
    );
  }

  get usdValue(): number {
    return this.totalAssets * this.price;
  }

  get myUSDValue(): number {
    return this.myBalance * this.price;
  }

  isEmpty(): boolean {
    return this.totalAssets === 0;
  }

  getAPRPercent(decimals: number = 2): string {
    return `${this.apr.toFixed(decimals)}%`;
  }

  toEntity(): VaultEntity {
    return {
      id: this.id,
      name: this.name,
      symbol: this.symbol,
      tokenAddress: this.tokenAddress,
      vaultAddress: this.vaultAddress,
      decimals: this.decimals,
      apr: this.apr,
      totalAssets: this.totalAssets,
      myBalance: this.myBalance,
      price: this.price,
    };
  }
}
