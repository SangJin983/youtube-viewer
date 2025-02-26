import { useCallback, useRef } from "react";

export const useThrottle = (
  fn,
  wait,
  options = { leading: true, trailing: false }
) => {
  const lastCallTime = useRef(0);
  const timer = useRef(null);

  return useCallback(
    (...args) => {
      const now = Date.now();
      const remainingTime = wait - (now - lastCallTime.current);

      if (remainingTime <= 0) {
        if (options.leading) {
          fn(...args);
        }
        lastCallTime.current = now;
        return;
      }
      if (options.trailing) {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          fn(...args);
          lastCallTime.current = now;
        }, remainingTime);
      }
      return;
    },
    [fn, wait, options]
  );
};
