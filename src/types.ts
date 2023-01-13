import { RefObject } from 'react';

export type Scroller = (scrollTo: number) => void;

export interface Options {
  delay?: number;
  centerOnScreen?: boolean;
  startAfter?: RefObject<HTMLElement>;
  stopAfter?: RefObject<HTMLElement>;
  scroller?: Scroller;
}

export type GetElementScroll = (target: HTMLElement) => number;
