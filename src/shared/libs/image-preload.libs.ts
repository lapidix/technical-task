const getTokenIconUrl = (symbol: string): string => {
  return `https://cdn.web3icons.org/tokens/${symbol.toLowerCase()}.svg`;
};

const getWalletIconUrl = (walletId: string): string => {
  return `https://cdn.web3icons.org/wallets/${walletId.toLowerCase()}.svg`;
};

const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      resolve();
    };

    img.onerror = (error) => {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Image Preload] Failed to load image: ${url}`, error);
      }
      // * 에러가 발생해도 앱이 멈추지 않도록 resolve
      resolve();
    };

    img.src = url;
  });
};

export const preloadTokenIcon = (symbol: string): Promise<void> => {
  return preloadImage(getTokenIconUrl(symbol));
};

export const preloadWalletIcon = (walletId: string): Promise<void> => {
  return preloadImage(getWalletIconUrl(walletId));
};
