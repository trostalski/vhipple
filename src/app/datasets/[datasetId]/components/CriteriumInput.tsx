import { AiFillDelete } from "react-icons/ai";
import { PatientCohort, PatientCohortCriterium } from "../../lib/types";

interface CriteriumInputProps {
  criterium: PatientCohortCriterium;
  setCriteria: (
    value: string,
    propName: string,
    criterium: PatientCohortCriterium
  ) => void;
  handleDelete: () => void;
}

const CriteriumInput = (props: CriteriumInputProps) => {
  const { criterium, setCriteria, handleDelete } = props;
  return (
    <div className="flex flex-row items-center gap-4 w-full">
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm">Name</span>
        <input
          className="border rounded-md px-2 py-1"
          value={criterium.name}
          onChange={(e) => {
            setCriteria(e.target.value, "name", criterium);
          }}
        />
      </div>
      <div className="flex flex-row items-center gap-2 w-full">
        <span className="text-sm">Path</span>
        <input
          className="border rounded-md px-2 py-1 grow"
          value={criterium.fhirPath}
          onChange={(e) => {
            setCriteria(e.target.value, "fhirPath", criterium);
          }}
        />
      </div>
      <div>
        <button
          className="text-primary-button border py-1 px-2 rounded-md transition hover:scale-110"
          onClick={() => {
            handleDelete();
          }}
        >
          <AiFillDelete size={16} />
        </button>
      </div>
    </div>
  );
};

export default CriteriumInput;
