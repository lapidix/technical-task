import { ERROR_TYPE } from "@/shared/constants";

export interface AppError extends Error {
  type: ERROR_TYPE;
  code?: string;
  statusCode?: number;
  retryable: boolean;
}

export class NetworkError extends Error implements AppError {
  type = ERROR_TYPE.NETWORK;
  retryable = true;

  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ApiError extends Error implements AppError {
  type = ERROR_TYPE.API;
  retryable: boolean;
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.retryable = statusCode ? statusCode >= 500 : false;
  }
}

export class ContractError extends Error implements AppError {
  type = ERROR_TYPE.CONTRACT;
  retryable = false;
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "ContractError";
    this.code = code;
  }
}
