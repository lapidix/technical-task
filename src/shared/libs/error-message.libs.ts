import { ERROR_MESSAGES, ERROR_TYPE } from "../constants";

import { parseError } from "./error-handler.libs";

export const getErrorMessageConfig = (error: unknown) => {
  const appError = parseError(error);
  const message = appError.message.toLowerCase();

  if (appError.type === ERROR_TYPE.NETWORK) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  if (appError.type === ERROR_TYPE.API) {
    if (message.includes("429") || message.includes("rate limit")) {
      return ERROR_MESSAGES.API_RATE_LIMIT;
    }
    if (message.includes("500") || message.includes("server")) {
      return ERROR_MESSAGES.API_SERVER_ERROR;
    }
  }

  if (appError.type === ERROR_TYPE.WALLET) {
    if (message.includes("not connected")) {
      return ERROR_MESSAGES.WALLET_NOT_CONNECTED;
    }
    if (message.includes("network") || message.includes("chain")) {
      return ERROR_MESSAGES.WALLET_WRONG_NETWORK;
    }
  }

  if (appError.type === ERROR_TYPE.CONTRACT) {
    if (message.includes("insufficient") || message.includes("balance")) {
      return ERROR_MESSAGES.CONTRACT_INSUFFICIENT_BALANCE;
    }
    return ERROR_MESSAGES.CONTRACT_TRANSACTION_FAILED;
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
};
