import React from "react";

interface FhirPathPreviewMenuProps {
  fhirPathValues: string[];
}

const FhirPathPreviewMenu = (props: FhirPathPreviewMenuProps) => {
  const { fhirPathValues } = props;
  return (
    <div className="absolute flex flex-col right-0 bottom-12 border-2 p-2 shadow-md bg-white w-64 h-64 rounded-md overflow-scroll">
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
