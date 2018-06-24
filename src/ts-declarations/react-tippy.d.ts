// To extend the type def file, please head over to https://github.com/tvkhoa/react-tippy to see all implemented options

declare module 'react-tippy' {
  import * as React from 'react';

  interface IProps {
    title: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    trigger: 'mouseenter' | 'click' | 'focus' | 'manual';
    delay?: number;
    hideDelay?: number;
  }

  export class Tooltip extends React.Component<IProps, {}> {}
}