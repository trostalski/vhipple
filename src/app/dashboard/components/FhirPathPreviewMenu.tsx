import React from "react";

interface FhirPathPreviewMenuProps {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
  fhirPathResults: any[][];
  datasetNames: string[];
}

const FhirPathPreviewMenu = (props: FhirPathPreviewMenuProps) => {
  console.log("FhirPathPreviewMenu", props.fhirPathResults);
  return (
    <div className="absolute flex flex-col right-0 bottom-12 border-2 p-2 shadow-md bg-white w-64 h-64 rounded-md overflow-scroll">
      <h1 className="text-lg font-bold">FHIR Path Preview</h1>
      {props.datasetNames.length === 0 ? (
        <span className="text-gray-500">No Dataset selected.</span>
      ) : (
        props.datasetNames.map((datasetName, i) => (
          <div className="w-full">
            <div className="w-full mt-2 text-center rounded-md bg-sky-400 p-0.5">
              <span className="font-light w-32 text-white ">{datasetName}</span>
            </div>
            {props.fhirPathResults[i].map((result) => (
              <div className="flex flex-col">
                <span className="text-xs">{result}</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default FhirPathPreviewMenu;
