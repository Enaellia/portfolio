export default function LogoE({ size = 28, title = "Logo E" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 150"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      
      <g fill="currentColor">
        <rect x="30" y="16" width="25" height="87" rx="10" />
        <rect x="40" y="16" width="60" height="18" rx="2" />
        <rect x="40" y="51" width="50" height="18" rx="2" />
        <rect x="40" y="86" width="78" height="18" rx="2" />
      </g>
    </svg>
  )
}
