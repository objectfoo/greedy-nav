import * as React from "react";

export interface IMenuItem {
  name: string;
}

type InitialNavItems = IMenuItem & {[key: string]: any };

/**
 * @description accept list of objects and a container ref, return horizontal items
 * that will fit inside of container div, other items returned in vertical
 */
export default function useGreedyNav(initialNavItems: InitialNavItems[]) {
  const container = React.useRef<HTMLDivElement>();
  const breakpoints = React.useRef<number[]>([]);
  const [available, setAvailable] = React.useState<number>(0);
  const [horizontal, setHorizontal] = React.useState<IMenuItem[]>([...initialNavItems]);
  const vertical = React.useRef<IMenuItem[]>([]);

  React.useEffect(() => {
    const onResize = () => {
      const clientWidth = container.current ? container.current.clientWidth : 0;
      setAvailable(clientWidth);
    };
    window.addEventListener("resize", onResize);
    setAvailable(container.current ? container.current.clientWidth : 0);
    return () => window.removeEventListener("resize", onResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    const used = container.current ? container.current.scrollWidth : 0;
    if (available !== 0 && used > available) {
      breakpoints.current.push(used);
      const moveItem = horizontal.pop();
      if (moveItem) {
        vertical.current.unshift(moveItem);
      }
      setHorizontal(horizontal.slice(0));
    } else {
      if (available > breakpoints.current[breakpoints.current.length -1]) {
        const moveItem = vertical.current.shift();
        if (moveItem) {
          setHorizontal(horizontal.concat(moveItem));
        }
      }
    }
  }, [available, horizontal])

  return {
    container,
    horizontal,
    vertical,
  };
}
