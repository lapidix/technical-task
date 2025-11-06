export const ENV = {
  COINGECKO_API_KEY: process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "",
  COINGECKO_BASE_URL: process.env.NEXT_PUBLIC_COINGECKO_API_URL || "",
} as const;
