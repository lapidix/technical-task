import { memo } from "react";
import { ErrorIcon } from "../common";
import { InformationIcon } from "./InformationIcon";
import { SuccessIcon } from "./SuccessIcon";
import { WarningIcon } from "./WarningIcon";

export const TOAST_ICON_KEYS = {
  SUCCESS: SuccessIcon,
  ERROR: ErrorIcon,
  INFO: InformationIcon,
  WARNING: WarningIcon,
} as const;

export type ToastIconType = keyof typeof TOAST_ICON_KEYS;

interface ToastIconProps extends React.SVGAttributes<SVGSVGElement> {
  icon: ToastIconType;
}

export const ToastIcon: React.FC<ToastIconProps> = memo(
  ({ icon, className, ...rest }) => {
    const IconComponent = TOAST_ICON_KEYS[icon];

    return <IconComponent className={className} {...rest} />;
  }
);

ToastIcon.displayName = "ToastIcon";
