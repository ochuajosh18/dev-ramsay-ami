import { useEffect, useLayoutEffect, useRef } from "react";

/**
 *
 * @param callback the function to call at each`delay` interval
 * @param delay the delay for the setInterval function
 * @description a hook that wraps the window.setInterval function
 */
export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // Set up the timeout
    if (!delay && delay !== 0) {
      return;
    }

    const timeoutId = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(timeoutId);
  }, [delay]);
}
