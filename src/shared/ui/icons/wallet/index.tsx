import { tcm } from "@/shared/libs";
import { BackpackIcon } from "./BackpackIcon";
import { MetaMaskIcon } from "./MetaMaskIcon";
import { OKXIcon } from "./OKXIcon";

export const WALLET_ICON_KEYS = {
  metamask: MetaMaskIcon,
  okx: OKXIcon,
  backpack: BackpackIcon,
} as const;
export type WalletIconType = keyof typeof WALLET_ICON_KEYS;

interface WalletIconProps extends React.SVGAttributes<SVGSVGElement> {
  icon: WalletIconType;
}

export const WalletIcon: React.FC<WalletIconProps> = ({
  icon,
  className,
  ...rest
}) => {
  const IconComponent = WALLET_ICON_KEYS[icon];

  return <IconComponent className={tcm(className)} {...rest} />;
};
