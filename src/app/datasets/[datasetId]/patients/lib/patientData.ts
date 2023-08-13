import { ResourceContainer } from "@/app/datasets/lib/types";
import {
  AllergyIntolerance,
  CarePlan,
  Condition,
  DiagnosticReport,
  Encounter,
  Immunization,
  Medication,
  MedicationRequest,
  Observation,
  Patient,
  Procedure,
  Resource,
} from "fhir/r4";
import { compile } from "fhirpath";
import { VisNetworkData } from "./types";
import { getTargetResources } from "@/app/db/utils";

const isActiveCondition = (condition: Condition) => {
  return condition.clinicalStatus?.coding?.[0].code === "active";
};

const isInactiveCondition = (condition: Condition) => {
  return condition.clinicalStatus?.coding?.[0].code === "inactive";
};

const isActiveMedication = (medication: Medication) => {
  return medication.status === "active";
};

export class PatientData {
  patient: Patient;
  connectedResources: Resource[];
  datasetName: string;
  resourceId: string;

  conditions: Condition[] = [];
  activeConditions: Condition[] = [];
  inactiveConditions: Condition[] = [];

  allergies: AllergyIntolerance[] = [];

  encounters: Encounter[] = [];

  observations: Observation[] = [];
  activeObservations: Observation[] = [];

  procedures: Procedure[] = [];

  diagnosticReports: DiagnosticReport[] = [];

  medications: Medication[] = [];
  activeMedications: Medication[] = [];

  medicationRequests: MedicationRequest[] = [];
  activeMedicationRequests: MedicationRequest[] = [];

  immunizations: Immunization[] = [];

  carePlans: CarePlan[] = [];

  constructor(
    patient: Patient,
    connectedResources: Resource[],
    datasetName: string
  ) {
    this.patient = patient;
    this.connectedResources = connectedResources;
    this.datasetName = datasetName;
    this.resourceId = patient.resourceType + "/" + patient.id!;

    this.encounters = this._getResourcesByType<Encounter>("Encounter");

    this.conditions = this._getResourcesByType<Condition>("Condition");
    this.activeConditions = this.conditions.filter(isActiveCondition);
    this.inactiveConditions = this.conditions.filter(isInactiveCondition);

    this.allergies =
      this._getResourcesByType<AllergyIntolerance>("AllergyIntolerance");

    this.observations = this._getResourcesByType<Observation>("Observation");
    this.activeObservations = this.observations.filter(
      (observation) => observation.status === "final"
    );

    this.procedures = this._getResourcesByType<Procedure>("Procedure");

    this.diagnosticReports =
      this._getResourcesByType<DiagnosticReport>("DiagnosticReport");

    this.medications = this._getResourcesByType<Medication>("Medication");
    this.activeMedications = this.medications.filter(isActiveMedication);

    this.medicationRequests =
      this._getResourcesByType<MedicationRequest>("MedicationRequest");
    this.activeMedicationRequests = this.medicationRequests.filter(
      (medicationRequest) => medicationRequest.status === "active"
    );

    this.immunizations = this._getResourcesByType<Immunization>("Immunization");

    this.carePlans = this._getResourcesByType<CarePlan>("CarePlan");
  }

  _getResourcesByType<T extends Resource>(type: string): T[] {
    return this.connectedResources.filter(
      (resource) => resource.resourceType === type
    ) as T[];
  }

  _getResourcesByPath<T extends Resource>(
    path: string,
    type: string
  ): T[] | undefined {
    const fpFunc = compile(path);
    const resources = this._getResourcesByType<T>(type);
    let values: T[] = [];
    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      const resourceValue = fpFunc(resource);
      if (resourceValue) {
        values = values.concat(resourceValue);
      }
    }
    return values;
  }

  async loadGraphData() {
    let result: VisNetworkData = {
      nodes: [],
      edges: [],
    };
    for (const resource of this.connectedResources) {
      const id = resource.id;
      const label = resource.resourceType;
      if (!id || id === this.resourceId) {
        continue;
      }
      if (result.nodes.findIndex((node) => node.id === id) === -1) {
        result.nodes.push({ id, label });
      }
      const connResources = await getTargetResources(this.datasetName, id);
      if (!connResources) {
        continue;
      }
      for (const connResource of connResources) {
        const connId = connResource.id;
        if (!connId) {
          continue;
        }
        if (result.nodes.findIndex((node) => node.id === connId) === -1) {
          result.nodes.push({ id: connId, label: connResource.resourceType });
        }
        result.edges.push({ from: id, to: connId });
      }
    }
    result = {
      nodes: result.nodes.filter((node) => node.id !== this.patient.id),
      edges: result.edges.filter(
        (edge) => edge.from !== this.patient.id && edge.to !== this.patient.id
      ),
    };
    return result;
  }
}
