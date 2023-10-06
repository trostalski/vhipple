import ModalWrapper from "@/app/components/ModalWrapper";
import { Resource } from "fhir/r4";
import React from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

interface PreviewModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  resource: Resource;
}

const PreviewModal = (props: PreviewModalProps) => {
  return (
    <ModalWrapper showModal={props.showModal} setShowModal={props.setShowModal}>
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <h1 className="font-light">
          {props.resource.resourceType + "/" + props.resource.id}
        </h1>
      </div>
      <div className="px-4 h-[calc(100vh-200px)] overflow-y-auto">
        <JsonView src={props.resource} />
      </div>
    </ModalWrapper>
  );
};

export default PreviewModal;
