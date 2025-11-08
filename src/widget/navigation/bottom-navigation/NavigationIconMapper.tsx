import {
  LogoIcon,
  MarketIcon,
  PointIcon,
  PortfolioIcon,
} from "@/shared/ui/icons/common";
import React from "react";

const NAVIGATION_ICON_KEYS = {
  Logo: LogoIcon,
  Market: MarketIcon,
  Portfolio: PortfolioIcon,
  Point: PointIcon,
} as const;

interface NavigationIconProps extends React.SVGAttributes<SVGSVGElement> {
  icon: keyof typeof NAVIGATION_ICON_KEYS;
}

export const NavigationIconMapper = ({
  icon,
  ...rest
}: NavigationIconProps) => {
  const IconComponent = NAVIGATION_ICON_KEYS[icon];

  return <IconComponent {...rest} />;
};
