import React from 'react';

const RightAngledIcon = ({fillcolor = '#ffffff'}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="8" viewBox="0 0 6 8" fill="none">
      <g clip-path="url(#clip0_15919_2583)">
        <path
          d="M1.99992 7.49992C1.87198 7.49992 1.74398 7.45109 1.64648 7.35344C1.45117 7.15812 1.45117 6.84172 1.64648 6.64641L4.29367 3.99992L1.64648 1.35352C1.45117 1.1582 1.45117 0.841797 1.64648 0.646484C1.8418 0.451172 2.1582 0.451172 2.35352 0.646484L5.35352 3.64648C5.54883 3.8418 5.54883 4.1582 5.35352 4.35352L2.35352 7.35352C2.25617 7.45148 2.12805 7.49992 1.99992 7.49992Z"
          fill={fillcolor}
        />
      </g>
      <defs>
        <clipPath id="clip0_15919_2583">
          <rect width="5" height="8" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RightAngledIcon;
