import { RefObject } from 'react';
import { GetElementScroll, Scroller } from './types';

export const refNotEmpty = (
  value: RefObject<HTMLElement>
): value is { current: HTMLElement } => {
  return value.current !== null && value.current !== undefined;
};

export const getElementScroll: GetElementScroll = (target: HTMLElement) =>
  target.offsetTop;

export const getElementScrollAtScreenCenter: GetElementScroll = (
  target: HTMLElement
) => {
  return (
    getElementScroll(target) -
    document.documentElement.clientHeight / 2 +
    target.scrollHeight / 2
  );
};

export const defaultScroller: Scroller = (scrollTo) => {
  document.documentElement.scrollTo({
    top: scrollTo,
    behavior: 'smooth'
  });
};
