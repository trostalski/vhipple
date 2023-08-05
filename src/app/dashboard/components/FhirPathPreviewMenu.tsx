import React from "react";

interface FhirPathPreviewMenuProps {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
  fhirPathResults: any[][];
}

const FhirPathPreviewMenu = (props: FhirPathPreviewMenuProps) => {
  return (
    <div className="absolute right-0 bottom-12 border-2 shadow-md bg-white w-64 h-64 rounded-md overflow-scroll">
      FhirPathPreviewMenu
    </div>
  );
};

export default FhirPathPreviewMenu;
