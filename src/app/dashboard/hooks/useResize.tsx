import { RefObject, useCallback, useEffect, useState } from "react";

const useResize = (
  resizeRef: RefObject<HTMLElement>,
  startWidth: number,
  startHeight: number
) => {
  const [isResizingWidth, setIsResizingWidth] = useState(false);
  const [isResizingHeight, setIsResizingHeight] = useState(false);
  const [resizeWidth, setResizeWidth] = useState<number>(
    startWidth || resizeRef.current!.offsetWidth
  );
  const [resizeHeight, setResizeHeight] = useState<number>(
    startHeight || resizeRef.current!.offsetHeight
  );

  const startResizingWidth = useCallback(() => {
    setIsResizingWidth(true);
  }, []);

  const stopResizingWidth = useCallback(() => {
    setIsResizingWidth(false);
  }, []);

  const startResizingHeight = useCallback(() => {
    setIsResizingHeight(true);
  }, []);

  const stopResizingHeight = useCallback(() => {
    setIsResizingHeight(false);
  }, []);

  const startResizing = useCallback(() => {
    setIsResizingHeight(true);
    setIsResizingWidth(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizingWidth(false);
    setIsResizingHeight(false);
  }, []);

  const isResizing = isResizingWidth || isResizingHeight;

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizingWidth && resizeRef.current) {
        const newWidth =
          mouseMoveEvent.clientX -
          resizeRef.current.getBoundingClientRect().left;
        setResizeWidth(newWidth);
      }
      if (isResizingHeight && resizeRef.current) {
        const newHeight =
          mouseMoveEvent.clientY -
          resizeRef.current.getBoundingClientRect().top;
        setResizeHeight(newHeight);
      }
    },
    [isResizingHeight, isResizingWidth]
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
    startResizingWidth,
    isResizing,
    stopResizingWidth,
    startResizingHeight,
    stopResizingHeight,
    stopResizing,
  };
};

export default useResize;
