import { Dataset, FhirPathAlias } from "@/app/datasets/lib/types";
import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

interface FhirPathAliasBoxProps {
  fhirPathAlias: FhirPathAlias;
}

const FhirPathAliasBox = (props: FhirPathAliasBoxProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <div className="flex flex-row gap-2">
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
        <button className="">Preview</button>
        {isEditing ? (
          <button
            className="py-2 px-4 h-full transition hover:bg-secondary-button hover:text-white rounded-md"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <AiOutlineCheck />
          </button>
        ) : (
          <button
            className="py-2 px-4 h-full transition hover:bg-secondary-button hover:text-white rounded-md"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <AiFillEdit />
          </button>
        )}
        <button className="py-2 px-4 h-full transition hover:bg-cancel-button hover:text-white rounded-md">
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default FhirPathAliasBox;
