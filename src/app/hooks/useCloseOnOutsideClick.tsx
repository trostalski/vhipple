import React, { useEffect } from "react";

interface Props {
  setShowMenu: (e: boolean) => void;
  elementId: string;
}

const useCloseOnOutsideClick = (props: Props) => {
  const { setShowMenu, elementId } = props;
  const closeEffect = useEffect(() => {
    const listener = (e: any) => {
      if (!e.target.closest(elementId)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  return {
    closeEffect,
  };
};

export default useCloseOnOutsideClick;
