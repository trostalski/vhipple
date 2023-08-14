import { AiFillDelete } from "react-icons/ai";
import { PatientCohortCriterium } from "../../lib/types";

interface CriteriumInputProps {
  criterium: PatientCohortCriterium;
  criteria: PatientCohortCriterium[];
  setCriteria: (criteria: PatientCohortCriterium[]) => void;
}

const CriteriumInput = (props: CriteriumInputProps) => {
  const { criterium, setCriteria } = props;
  return (
    <div className="flex flex-row items-center gap-4 w-full">
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm">Name</span>
        <input
          className="border rounded-md px-2 py-1"
          value={criterium.name}
          onChange={(e) => {
            const newCriteria = props.criteria.map((c) => {
              if (c.id === criterium.id) {
                return { ...c, name: e.target.value };
              }
              return c;
            });
            setCriteria(newCriteria);
          }}
        />
      </div>
      <div className="flex flex-row items-center gap-2 w-full">
        <span className="text-sm">Path</span>
        <input
          className="border rounded-md px-2 py-1 grow"
          value={criterium.fhirPath}
          onChange={(e) => {
            const newCriteria = props.criteria.map((c) => {
              if (c.id === criterium.id) {
                return { ...c, fhirPath: e.target.value };
              }
              return c;
            });
            setCriteria(newCriteria);
          }}
        />
      </div>
      <div>
        <button
          className="text-primary-button border py-1 px-2 rounded-md transition hover:scale-110"
          onClick={() => {
            const newCriteria = props.criteria.filter(
              (c) => c.id !== criterium.id
            );
            setCriteria(newCriteria);
          }}
        >
          <AiFillDelete size={16} />
        </button>
      </div>
    </div>
  );
};

export default CriteriumInput;
