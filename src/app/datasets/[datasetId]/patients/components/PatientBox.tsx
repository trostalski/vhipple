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
  const patient = patientContainer.resource as Patient;
  const datasetName = patientContainer.datasetId;
  return (
    <div
      className="flex flex-col bg-white rounded-lg shadow-lg p-4 hover:cursor-pointer border border-white hover:border-gray-300"
      onClick={() =>
        router.push(`/patients/${patient.id}?dataset=${datasetName}`)
      }
    >
      <div className="flex flex-row">
        {patient.name && patient.name[0] && patient.name[0].given && (
          <span className="">
            {patient.name[0].given[0]} {patient.name[0].family}
          </span>
        )}
        {patient.id && <span className="text-xs ml-auto">{patient.id}</span>}
      </div>
      <div className="flex flex-row gap-2 text-xs text-gray-500">
        {patient.gender && <span className="">{patient.gender}</span>}
        {patient.birthDate && (
          <span className="">{getAge(patient.birthDate)}</span>
        )}
      </div>
      <div className="flex flex-row gap-2 text-xs text-gray-500">
        {patient.address && patient.address[0] && (
          <span className="">{patient.address[0].city}</span>
        )}
        {patient.address && patient.address[0] && (
          <span className="">{patient.address[0].country}</span>
        )}
      </div>
    </div>
  );
};

export default PatientBox;
