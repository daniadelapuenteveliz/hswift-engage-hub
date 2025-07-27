import React from 'react';

export const BRFlag = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" {...props}>
    <rect width="1000" height="700" fill="#009c3b"/>
    <path d="M500 85L110 350l390 265L890 350 500 85z" fill="#ffdf00"/>
    <circle cx="500" cy="350" r="175" fill="#002776"/>
  </svg>
);
