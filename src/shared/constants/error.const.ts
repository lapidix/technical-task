export const ERROR_MESSAGES = {
  NETWORK_ERROR: {
    title: "Connection Lost",
    message: "Please check your internet connection and try again.",
    action: "Retry",
  },

  API_RATE_LIMIT: {
    title: "Too Many Requests",
    message: "Please wait a moment before trying again.",
    action: "Wait and Retry",
  },
  API_SERVER_ERROR: {
    title: "Server Error",
    message: "Our servers are experiencing issues. Please try again later.",
    action: "Retry",
  },

  WALLET_NOT_CONNECTED: {
    title: "Wallet Not Connected",
    message: "Please connect your wallet to continue.",
    action: "Connect Wallet",
  },
  WALLET_WRONG_NETWORK: {
    title: "Wrong Network",
    message: "Please switch to Base Sepolia network.",
    action: "Switch Network",
  },

  CONTRACT_INSUFFICIENT_BALANCE: {
    title: "Insufficient Balance",
    message: "You don't have enough tokens for this transaction.",
    action: "Go Back",
  },
  CONTRACT_TRANSACTION_FAILED: {
    title: "Transaction Failed",
    message: "The transaction was rejected or failed.",
    action: "Try Again",
  },

  UNKNOWN_ERROR: {
    title: "Something Went Wrong",
    message: "An unexpected error occurred. Please try again.",
    action: "Retry",
  },
} as const;

export enum ERROR_TYPE {
  NETWORK = "NETWORK",
  API = "API",
  CONTRACT = "CONTRACT",
  WALLET = "WALLET",
  VALIDATION = "VALIDATION",
  UNKNOWN = "UNKNOWN",
}
