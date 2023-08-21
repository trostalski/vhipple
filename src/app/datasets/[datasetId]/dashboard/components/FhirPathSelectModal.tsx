import ModalWrapper from "@/app/components/ModalWrapper";
import SearchBar from "@/app/components/SearchBar";
import { FhirPathAlias } from "@/app/datasets/lib/types";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

interface FhirPathSelectModalProps {
  fhirPathAliases: FhirPathAlias[];
  datasetId: string;
  setShowModal: (closeMenu: boolean) => void;
  showModal: boolean;
  handleSelect: (fhirPathAlias: FhirPathAlias) => void;
}

const FhirPathSelectModal = (props: FhirPathSelectModalProps) => {
  const { fhirPathAliases, setShowModal, showModal, handleSelect, datasetId } =
    props;

  const [selected, setSelected] = useState<FhirPathAlias | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const filteredFhirPathAliases = fhirPathAliases.filter((fhirPathAlias) => {
    return (
      fhirPathAlias.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fhirPathAlias.path.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <ModalWrapper setShowModal={setShowModal} showModal={showModal}>
      <div className="flex flex-col gap-2 p-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={() => {}}
          placeholder="Search Fhir Path Aliases"
        />
        {filteredFhirPathAliases
          .sort((a, b) => a.alias.localeCompare(b.alias))
          .map((fhirPathAlias) => {
            return (
              <button
                className={`flex flex-col gap-1 p-2 rounded-md border ${
                  selected?.id === fhirPathAlias.id
                    ? "bg-gray-200"
                    : "bg-white hover:bg-gray-100"
                }`}
                key={fhirPathAlias.id}
                onClick={(e) => setSelected(fhirPathAlias)}
              >
                <span className="text-gray-700">{fhirPathAlias.alias}</span>
                <span className="text-gray-400">{fhirPathAlias.path}</span>
              </button>
            );
          })}
        <div className="flex flex-row w-full items-center justify-start">
          <button
            className="
            text-gray-500 rounded-md px-4 py-2 transition hover:underline
          "
            onClick={() => {
              router.push(`/datasets/${datasetId}/settings/`);
            }}
          >
            Edit
          </button>
          <div className="flex-grow"></div>
          <button
            className="bg-cancel-button text-white rounded-md px-4 py-2 mr-2 transition hover:bg-cancel-button-hover"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-primary-button text-white rounded-md px-4 py-2 transition hover:bg-primary-button-hover"
            onClick={() => {
              if (selected) {
                handleSelect(selected);
              }
            }}
          >
            Select
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default FhirPathSelectModal;
