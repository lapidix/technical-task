import { tcm } from "@/shared/libs";
import * as React from "react";

export const CloseIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    className={tcm("w-6 h-6", className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
