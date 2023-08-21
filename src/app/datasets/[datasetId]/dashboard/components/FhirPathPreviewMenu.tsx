import useCloseOnOutsideClick from "@/app/hooks/useCloseOnOutsideClick";
import React from "react";

interface FhirPathPreviewMenuProps {
  fhirPathValues: string[];
  setShowMenu: (e: boolean) => void;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

const FhirPathPreviewMenu = (props: FhirPathPreviewMenuProps) => {
  const { fhirPathValues, setShowMenu } = props;
  useCloseOnOutsideClick({
    setShowMenu: setShowMenu,
    elementId: "#fhirpath-preview-menu",
  });
  return (
    <div
      id="fhirpath-preview-menu"
      className={`absolute flex flex-col border-2 p-2 shadow-md bg-white w-64 h-64 rounded-md overflow-scroll z-10 ${
        props.top ? `top-${props.top}` : ""
      } ${props.left ? `left-${props.left}` : ""} ${
        props.bottom ? `bottom-${props.bottom}` : ""
      } ${props.right ? `right-${props.right}` : ""}`}
    >
      <h1 className="text-lg font-bold">FHIR Path Preview</h1>
      {fhirPathValues.map((result, i) => (
        <div className="flex flex-col" key={i}>
          <span className="text-xs">{JSON.stringify(result)}</span>
        </div>
      ))}
    </div>
  );
};

export default FhirPathPreviewMenu;
