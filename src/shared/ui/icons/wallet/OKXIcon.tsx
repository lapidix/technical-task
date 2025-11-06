import { tcm } from "@/shared/libs";

export const OKXIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    className={tcm("w-14 h-14", className)}
    {...props}>
    <path
      fill="#000"
      d="M3 3h6v6H3zm12 6H9v6H3v6h6v-6h6v6h6v-6h-6zm0 0V3h6v6z"
    />
  </svg>
);
