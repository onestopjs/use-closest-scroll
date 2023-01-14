# use-closest-scroll

React hook to automatically scroll to closest predefined element when the user stops scrolling.

Better demonstrated than explained: [example](https://codesandbox.io/s/use-closest-scroll-example-lgd32y)

In short, it does not affect or restrict the user's scrolling, but when they stop scrolling, the view is snapped to one of the predefined elements.

## Usage

```tsx
import useClosestScroll from 'use-closest-scroll';

const App = () => {
  const element1 = useRef(null);
  const element2 = useRef(null);
  const element3 = useRef(null);

  useClosestScroll([element1, element2, element3], {
    delay: 500,
    centerOnScreen: true,
    startAfter: element1,
    stopAfter: element3
  });

  return (
    <>
      <div ref={element1}>{/* ... */}</div>
      <div ref={element2}>{/* ... */}</div>
      <div ref={element3}>{/* ... */}</div>
    </>
  }
);
```

The first argument is an array of refs to all the elements, which you want the view to snap to.

The second arguments are options, which are **not** required.

If you want to enable the module after a certain element, pass a ref to it as the `startAfter` option.
If you want to disable the module after a certain element, pass a ref to it as the `stopAfter` option.

## Options

| option         | default   | type                       | description                                                                                        |
| -------------- | --------- | -------------------------- | -------------------------------------------------------------------------------------------------- |
| delay          | 500       | number                     | time (in ms) to wait after the user stops scrolling                                                |
| centerOnScreen | false     | boolean                    | whether to scroll so the target element is in the middle of screen. when false, it goes at the top |
| startAfter     | undefined | RefObject<HTMLElement>     | ref to the element after which you want to enable the module                                       |
| stopAfter      | undefined | RefObject<HTMLElement>     | ref to the element after which you want to disable the module                                      |
| scroller       | -         | (scrollTo: number) => void | function which does the scrolling                                                                  |

## Custom scroller

If you don't like the default scroll behavior, you can pass a custom function to do the scrolling.

```tsx
...

const customScroller = (scrollTo: number) => {
  // scroll to the target position however you like, e.g.:
  document.documentElement.scrollTo({ top: scrollTo });
}

useClosestScroll([element1, element2, element3], {
  scroller: customScroller
});
```

## API (exports)

This module is written in TypeScript, so the types are included.

### Default export

```ts
useClosestScroll: (elements: RefObject<HTMLElement>[], { startAfter, stopAfter, delay, centerOnScreen, scroller }?: Options) => () => void
```

### Scroller

Type for a custom function to do the scrolling. Accepted as part of `Options`.

```ts
type Scroller = (scrollTo: number) => void;
```

### Options

```ts
interface Options {
  delay?: number;
  centerOnScreen?: boolean;
  startAfter?: RefObject<HTMLElement>;
  stopAfter?: RefObject<HTMLElement>;
  scroller?: Scroller;
}
```

###

## License

Licensed under the [MIT License](./LICENSE).
