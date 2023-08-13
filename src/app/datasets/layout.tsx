"use client";
import React, { useEffect, useState } from "react";
import { availableColorThemes, colorThemeStorageKey } from "../lib/constants";

const layout = ({ children }: { children: React.ReactNode }) => {
  // get color theme from localStorage
  const [colorTheme, setColorTheme] = useState<string>(
    availableColorThemes[0].value
  );
  useEffect(() => {
    const savedColorTheme =
      localStorage.getItem(colorThemeStorageKey) || colorTheme;
    setColorTheme(savedColorTheme);
  }, []);

  return (
    <div className={`h-full w-full bg-main-bg ${colorTheme}`}>{children}</div>
  );
};

export default layout;
