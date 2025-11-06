import { tcm } from "@/shared/libs";
import { BitcoinIcon } from "./BitcoinIcon";
import { USDCIcon } from "./USDCIcon";
import { USDTIcon } from "./USDTIcon";

export const NETWORK_ICON_KEYS = {
  btc: BitcoinIcon,
  usdt: USDTIcon,
  usdc: USDCIcon,
} as const;
export type NetworkIconType = keyof typeof NETWORK_ICON_KEYS;

interface NetworkIconProps extends React.SVGAttributes<SVGSVGElement> {
  icon: NetworkIconType;
}

export const NetworkIcon: React.FC<NetworkIconProps> = ({
  icon,
  className,
  ...rest
}) => {
  const IconComponent = NETWORK_ICON_KEYS[icon];

  return <IconComponent className={tcm(className)} {...rest} />;
};
