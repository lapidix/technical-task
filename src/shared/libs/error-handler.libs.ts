import { ERROR_TYPE } from "@/shared/constants";
import {
  ApiError,
  AppError,
  ContractError,
  NetworkError,
} from "@/shared/types/error.types";

export const parseError = (error: unknown): AppError => {
  if (
    error instanceof NetworkError ||
    error instanceof ApiError ||
    error instanceof ContractError
  ) {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("fetch") || message.includes("network")) {
      return new NetworkError(error.message);
    }

    if (message.includes("api") || message.includes("http")) {
      const statusMatch = message.match(/(\d{3})/);
      const statusCode = statusMatch ? parseInt(statusMatch[1]) : undefined;
      return new ApiError(error.message, statusCode);
    }

    if (message.includes("contract") || message.includes("revert")) {
      return new ContractError(error.message);
    }
  }

  return {
    name: "UnknownError",
    message: "An unknown error occurred",
    type: ERROR_TYPE.UNKNOWN,
    retryable: false,
  } as AppError;
};

export const shouldRetry = (error: unknown): boolean => {
  const appError = parseError(error);
  return appError.retryable;
};

export const getErrorMessage = (error: unknown): string => {
  const appError = parseError(error);

  switch (appError.type) {
    case ERROR_TYPE.NETWORK:
      return "Network connection failed. Please check your internet.";
    case ERROR_TYPE.API:
      return "API request failed. Please try again.";
    case ERROR_TYPE.CONTRACT:
      return "Smart contract error. Please check your transaction.";
    case ERROR_TYPE.WALLET:
      return "Wallet connection error. Please reconnect your wallet.";
    default:
      return appError.message || "An unexpected error occurred.";
  }
};
