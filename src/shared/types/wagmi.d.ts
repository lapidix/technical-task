import type { wagmiConfig } from "../config/wagmi.config";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
