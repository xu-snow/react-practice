import { useEffect, useRef } from 'react';

const useEventListener = <K extends keyof WindowEventMap>(eventName: K, handler: (ev: WindowEventMap[K]) => any, element = window) => {
  const savedHandler = useRef<typeof handler>();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) { return; }

      const eventListener = (event: WindowEventMap[K]) => savedHandler.current!(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
};

export default useEventListener;