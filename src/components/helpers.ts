import { useRef, useEffect } from "react";
import { HashedOrders, Order, PriceMode } from "../modules/types";

type Fn = () => void;
type Deps = [...args: any];
type Callback = (time: number) => void;

function usePrevious(value: Deps) {
  const ref = useRef<Deps>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function sortOrders(orders: HashedOrders, mode: PriceMode): Order[] {
  const ordersArray = Object.values(orders);

  const sortedOrders = ordersArray.sort((a: Order, b: Order) => {
    const sortValue = a.price < b.price ? 1 : -1;
    return mode === PriceMode.Buy ? sortValue : -sortValue;
  });

  return sortedOrders;
}

export const useAnimationFrame = (callback: Callback) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef && !!previousTimeRef.current) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, []);
};

export function useEffectAllDepsChange(fn: Fn, deps: Deps) {
  const prevDeps = usePrevious(deps);
  const changeTarget = useRef<Deps>();

  useEffect(() => {
    if (changeTarget.current === undefined) {
      changeTarget.current = prevDeps;
    }

    if (changeTarget.current === undefined) {
      return fn();
    }

    if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
      changeTarget.current = deps;

      return fn();
    }
  }, [fn, prevDeps, deps]);
}
