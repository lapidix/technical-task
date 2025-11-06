import { tcm } from "@/shared/libs";
import * as React from "react";

export const ConnectIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    className={tcm("w-4 h-4", className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);
