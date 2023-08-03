import { Resource } from "fhir/r4";

export interface Dataset {
  name: string;
  size: number;
  description?: string;
  resources: Resource[];
}

export interface ModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
