import { Dataset, FhirPathAlias } from "@/app/datasets/lib/types";
import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import FhirPathPreviewMenu from "../../dashboard/components/FhirPathPreviewMenu";
import useFhirPathPreview from "../../dashboard/hooks/useFhirPathPreview";
import { Resource } from "fhir/r4";

interface FhirPathAliasBoxProps {
  resources: Resource[];
  fhirPathAlias: FhirPathAlias;
}

const FhirPathAliasBox = (props: FhirPathAliasBoxProps) => {
  const { resources, fhirPathAlias } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { fhirPathValues, computeFhirPathValues } = useFhirPathPreview();
  return (
    <div className="relative flex flex-row gap-2">
      <input
        className="w-1/2 border rounded-md border-gray-200 px-2 py-1"
        disabled={!isEditing}
        value={props.fhirPathAlias.alias}
        onChange={(e) => {}}
      />
      <input
        className="w-full border rounded-md border-gray-200 px-2 py-1"
        disabled={!isEditing}
        value={props.fhirPathAlias.path}
        onChange={(e) => {}}
      />
      <div className="flex-grow"></div>
      <div className="flex flex-row">
        <button
          className="px-2 text-gray-500 transition hover:underline"
          onClick={() => {
            setShowPreview(!showPreview);
            computeFhirPathValues(fhirPathAlias.path, resources);
          }}
        >
          Preview
        </button>
        {showPreview && (
          <FhirPathPreviewMenu
            setShowMenu={setShowPreview}
            fhirPathValues={fhirPathValues}
            left="right-0"
            top="top-8"
          />
        )}
        {isEditing ? (
          <button
            className="py-2 px-2 text-primary-button transition hover:text-primary-button-hover"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <AiOutlineCheck />
          </button>
        ) : (
          <button
            className="py-2 px-2 text-primary-button transition hover:text-primary-button-hover"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <AiFillEdit />
          </button>
        )}
        <button className="py-2 px-2 text-cancel-button transition hover:text-cancel-button-hover">
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default FhirPathAliasBox;
