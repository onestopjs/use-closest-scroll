import { RefObject, useEffect, useCallback, useRef } from 'react';
import { Options } from './types';
import {
  defaultScroller,
  getElementScroll,
  getElementScrollAtScreenCenter,
  refNotEmpty
} from './utils';

const useClosestScroll = (
  elements: RefObject<HTMLElement>[],
  {
    startAfter,
    stopAfter,
    delay = 500,
    centerOnScreen = false,
    scroller = defaultScroller
  }: Options = {}
) => {
  const timerRef = useRef<number>();

  const scroll = useCallback(() => {
    const scrolledAmount = document.documentElement.scrollTop;

    if (
      startAfter &&
      refNotEmpty(startAfter) &&
      scrolledAmount < getElementScroll(startAfter.current)
    ) {
      return;
    }

    if (
      stopAfter &&
      refNotEmpty(stopAfter) &&
      scrolledAmount > getElementScroll(stopAfter.current)
    ) {
      return;
    }

    const getScroll = centerOnScreen
      ? getElementScrollAtScreenCenter
      : getElementScroll;

    const availableElements = elements.filter(refNotEmpty);

    if (availableElements.length === 0) {
      return;
    }

    const scrollTarget = availableElements
      .map((element) => element.current)
      .reduce<HTMLElement>((prev, curr) => {
        const closerThanPrevious =
          Math.abs(getScroll(curr) - scrolledAmount) <
          Math.abs(getScroll(prev) - scrolledAmount);

        return closerThanPrevious ? curr : prev;
      }, availableElements[0].current);

    const scrollTo = centerOnScreen
      ? getElementScrollAtScreenCenter(scrollTarget)
      : getElementScroll(scrollTarget);

    scroller(scrollTo);
  }, [elements, delay, startAfter, stopAfter]);

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        scroll();
      }, delay);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timerRef.current);
    };
  }, [scroll]);

  // if for some reason you want to manually trigger a scroll
  return scroll;
};

export default useClosestScroll;
