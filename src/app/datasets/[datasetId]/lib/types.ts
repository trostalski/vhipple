import { Dataset } from "../../lib/types";

export interface ValueCount {
  value: string;
  count: number;
}

export interface DatasetInfo {
  numPatients: number;
  numEncounters: number;
  numObservations: number;
  numConditions: number;
  numProcedures: number;
  numImmunizations: number;
  numMedications: number;
  numAllergies: number;
  numCarePlans: number;
  mostCommonConditions: ValueCount[];
  mostCommonProcedures: ValueCount[];
  mostCommonMedications: ValueCount[];
  mostCommonAllergies: ValueCount[];
  averageAge?: number;
  medianAge?: number;
}
