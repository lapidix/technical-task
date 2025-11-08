export const PortfolioIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}>
    <path
      d="M18.0046 5.99562V18.0045H5.99566V5.99562H18.0046ZM18.7823 4.44006H5.21789C4.79011 4.44006 4.44011 4.79006 4.44011 5.21784V18.7823C4.44011 19.2101 4.79011 19.5601 5.21789 19.5601H18.7823C19.2101 19.5601 19.5601 19.2101 19.5601 18.7823V5.21784C19.5601 4.79006 19.2101 4.44006 18.7823 4.44006Z"
      fill="#9DA59D"
    />
    <path d="M9.96267 12.4629V16.084H8.01735V12.4629H9.96267Z" fill="#9DA59D" />
    <path
      d="M12.9688 7.91675V16.0834H11.0235V7.91675H12.9688Z"
      fill="#9DA59D"
    />
    <path
      d="M15.9516 10.4756V16.0837H14.0063V10.4756H15.9516Z"
      fill="#9DA59D"
    />
  </svg>
);
