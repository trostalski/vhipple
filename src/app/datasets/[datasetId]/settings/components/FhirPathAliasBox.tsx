import { FhirPathAlias } from "@/app/datasets/lib/types";
import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import FhirPathPreviewMenu from "../../dashboard/components/FhirPathPreviewMenu";
import useFhirPathPreview from "../../dashboard/hooks/useFhirPathPreview";
import { Resource } from "fhir/r4";
import { AiOutlineClose } from "react-icons/ai";

interface FhirPathAliasBoxProps {
  resources: Resource[];
  fhirPathAlias: FhirPathAlias;
  handleDetete: (id: string) => void;
  handleUpdate: (fhirPathAlias: FhirPathAlias) => void;
}

const FhirPathAliasBox = (props: FhirPathAliasBoxProps) => {
  const {
    resources,
    fhirPathAlias: initialFhirPathAlias,
    handleDetete,
    handleUpdate,
  } = props;
  const [fhirPathAlias, setFhirPathAlias] =
    useState<FhirPathAlias>(initialFhirPathAlias);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { fhirPathValues, computeFhirPathValues } = useFhirPathPreview();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFhirPathAlias({
      ...fhirPathAlias,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative flex flex-row gap-2">
      <input
        name="alias"
        className="w-1/2 border rounded-md border-gray-200 px-2 py-1"
        disabled={!isEditing}
        value={fhirPathAlias.alias}
        onChange={(e) => handleChange(e)}
      />
      <input
        name="path"
        className="w-full border rounded-md border-gray-200 px-2 py-1"
        disabled={!isEditing}
        value={fhirPathAlias.path}
        onChange={(e) => handleChange(e)}
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
              handleUpdate(fhirPathAlias);
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
        <div className="w-8">
          {isEditing ? (
            <button
              className="py-2 px-2 text-cancel-button transition hover:text-cancel-button-hover"
              onClick={() => {
                setIsEditing(false);
                setFhirPathAlias(initialFhirPathAlias);
              }}
            >
              <AiOutlineClose />
            </button>
          ) : (
            <button
              className="py-2 px-2 text-cancel-button transition hover:text-cancel-button-hover"
              onClick={() => handleDetete(fhirPathAlias.id)}
            >
              <AiFillDelete />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FhirPathAliasBox;
