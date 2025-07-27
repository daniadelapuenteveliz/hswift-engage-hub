import React from 'react';

export const USFlag = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" {...props}>
    <path fill="#B22234" d="M0 0h7410v3900H0z"/>
    <path d="M0 450h7410M0 1150h7410M0 1850h7410M0 2550h7410M0 3250h7410" stroke="#fff" strokeWidth="300"/>
    <path fill="#3C3B6E" d="M0 0h2964v2100H0z"/>
    <g fill="#fff">
      <g id="s50">
        <g id="s9">
          <path id="s" d="M247 175l-45-136 45-136 45 136z"/>
          <use xlinkHref="#s" x="494"/>
          <use xlinkHref="#s" x="988"/>
          <use xlinkHref="#s" x="1482"/>
          <use xlinkHref="#s" x="1976"/>
          <use xlinkHref="#s" x="2470"/>
        </g>
        <use xlinkHref="#s9" y="210"/>
        <use xlinkHref="#s9" y="420"/>
        <use xlinkHref="#s9" y="630"/>
        <use xlinkHref="#s9" y="840"/>
      </g>
      <use xlinkHref="#s50" y="1050"/>
    </g>
  </svg>
);
