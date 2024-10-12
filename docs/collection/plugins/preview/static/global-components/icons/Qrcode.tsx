const Qrcode = ({ color = 'currentColor', ...props }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="4"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 30V34M24 37V43M43 24H37M34 24H30M7 7H24V24H7V7ZM7 32H16V41H7V32ZM32 32H41V41H32V32ZM32 7H41V16H32V7ZM14 14H17V17H14V14Z"
      strokeLinecap="butt"
    ></path>
  </svg>
);

export default Qrcode;
