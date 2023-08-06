import { RefObject, useCallback, useEffect, useState } from "react";
import { scrollOnMouseEdge } from "../lib/utils";

const useResize = (
  resizeRef: RefObject<HTMLElement>,
  startWidth: number,
  startHeight: number
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeWidth, setResizeWidth] = useState<number>(
    startWidth || resizeRef.current!.offsetWidth
  );
  const [resizeHeight, setResizeHeight] = useState<number>(
    startHeight || resizeRef.current!.offsetHeight
  );

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && resizeRef.current) {
        const newWidth =
          mouseMoveEvent.clientX -
          resizeRef.current.getBoundingClientRect().left;
        const newHeight =
          mouseMoveEvent.clientY -
          resizeRef.current.getBoundingClientRect().top;
        setResizeWidth(newWidth);
        setResizeHeight(newHeight);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return {
    resizeRef,
    resizeWidth,
    resizeHeight,
    setResizeWidth,
    startResizing,
    stopResizing,
    isResizing,
  };
};

export default useResize;
