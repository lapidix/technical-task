// * Wagmi v2의 권장 설정
import type { wagmiConfig } from "../config/wagmi.config";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
