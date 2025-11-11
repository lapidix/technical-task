import { ENV } from "../config";
import { BaseApiClient } from "./api.libs";

export {
  formatReceiptRevertedMessage,
  formatTransactionErrorMessage,
} from "./error-formatter.libs";
export { getErrorMessage, parseError } from "./error-handler.libs";
export { getErrorMessageConfig } from "./error-message.libs";
export { formatAmount, formatCompactNumber } from "./format.libs";
export { tcm } from "./styles.libs";
export const coinGeckoApiClient = new BaseApiClient({
  baseURL: ENV.COINGECKO_BASE_URL,
});
