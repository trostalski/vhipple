import { getAllPatients } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import PatientBox from "./PatientBox";
import Pagination from "@/app/components/Pagination";

interface PatientsListProps {}

const PatientsList = (props: PatientsListProps) => {
  const [page, setPage] = useState(0);
  const numberToDisplay = 10;
  const patients = useLiveQuery(getAllPatients);
  return (
    <div className="flex flex-col flex-wrap gap-4 mt-4">
      {!patients || patients.length == 0 ? (
        <span className="text-gray-500">No Patients found.</span>
      ) : (
        patients
          .slice(page * numberToDisplay, (page + 1) * numberToDisplay)
          .map((patient) => <PatientBox patientContainer={patient} />)
      )}
      <span className="grow" />
      <Pagination
        page={page}
        setPage={setPage}
        totalLength={patients?.length || 1}
        numberToDisplay={10}
      />
    </div>
  );
};

export default PatientsList;
