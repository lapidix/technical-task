import { tcm } from "@/shared/libs";
import * as React from "react";

export const SearchIcon = ({
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
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);
