import { ResourceContainer } from "@/app/datasets/lib/types";
import { Patient } from "fhir/r4";
import { useRouter } from "next/navigation";
import React from "react";
import { getAge } from "../lib/utils";

interface PatientBoxProps {
  patientContainer: ResourceContainer;
}

const PatientBox = (props: PatientBoxProps) => {
  const { patientContainer } = props;
  const router = useRouter();
  const resource = patientContainer.resource as Patient;
  const datasetName = patientContainer.datasetName;
  return (
    <div
      className="flex flex-row justify-between bg-white rounded-lg shadow-lg p-4 hover:cursor-pointer border border-white hover:border-gray-300"
      onClick={() =>
        router.push(`/patients/${resource.id}?dataset=${datasetName}`)
      }
    >
      {resource.name && resource.name[0] && resource.name[0].given && (
        <span className="">
          {resource.name[0].given[0]} {resource.name[0].family}
        </span>
      )}
      <div>
        <div className="flex flex-row gap-2 text-xs text-gray-500">
          {resource.gender && <span className="">{resource.gender}</span>}
          {resource.birthDate && (
            <span className="">{getAge(resource.birthDate)}</span>
          )}
        </div>
        <div className="flex flex-row gap-2 text-xs text-gray-500">
          {resource.address && resource.address[0] && (
            <span className="">{resource.address[0].city}</span>
          )}
          {resource.address && resource.address[0] && (
            <span className="">{resource.address[0].country}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientBox;
