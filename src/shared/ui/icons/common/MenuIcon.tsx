export const MenuIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}>
    <g clipPath="url(#clip0_1_2658)">
      <path
        d="M6 10H10V6H6V10ZM12 22H16V18H12V22ZM6 22H10V18H6V22ZM6 16H10V12H6V16ZM12 16H16V12H12V16ZM18 6V10H22V6H18ZM12 10H16V6H12V10ZM18 16H22V12H18V16ZM18 22H22V18H18V22Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_2658">
        <rect width="24" height="24" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>
);
