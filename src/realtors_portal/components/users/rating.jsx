import React from 'react';

const RatingIcon = ({fill}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
    <g clip-path="url(#clip0_13568_21834)">
      <path
        d="M10.9347 15.448L5.0071 18.766L6.33079 12.103L1.34277 7.49067L8.089 6.69057L10.9347 0.521729L13.7805 6.69057L20.5267 7.49067L15.5387 12.103L16.8624 18.766L10.9347 15.448Z"
        fill={fill || '#CBCBCB'}
      />
    </g>
    <defs>
      <clipPath id="clip0_13568_21834">
        <rect
          width="20.1706"
          height="20.1706"
          fill="white"
          transform="translate(0.850586 0.101562)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default RatingIcon;
