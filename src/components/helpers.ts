import { useRef, useEffect } from "react";
import { PriceMode } from "./Panel/PanelEntry/PanelEntry.types";

function usePrevious(value: any) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function sortOrders(orders: any, mode: PriceMode): any {
  const ordersArray = Object.values(orders);

  const sortedOrders = ordersArray.sort((a: any, b: any) => {
    const sortValue = a.price < b.price ? 1 : -1;
    return mode === PriceMode.Buy ? sortValue : -sortValue;
  });

  return sortedOrders;
}

export const useAnimationFrame = (callback: any) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time: any) => {
    if (previousTimeRef && !!previousTimeRef.current) {
      const deltaTime = time - (previousTimeRef as any).current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    (requestRef as any).current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    (requestRef as any).current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame((requestRef as any).current);
  }, []);
};

export function useEffectAllDepsChange(fn: any, deps: any) {
  const prevDeps = usePrevious(deps);
  const changeTarget: any = useRef();

  useEffect(() => {
    if (changeTarget.current === undefined) {
      changeTarget.current = prevDeps;
    }

    if (changeTarget.current === undefined) {
      return fn();
    }

    if (changeTarget.current.every((dep: any, i: any) => dep !== deps[i])) {
      changeTarget.current = deps;

      return fn();
    }
  }, [fn, prevDeps, deps]);
}
