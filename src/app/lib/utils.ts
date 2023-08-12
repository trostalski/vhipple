import { Patient } from "fhir/r4";
import { TablePatient } from "../patients/components/PatientsTable";
import { getAge } from "../patients/lib/utils";
import { v4 as uuid } from "uuid";

export const getPatientInfo = (patient: Patient): TablePatient => {
  const firstName = patient.name?.[0].given?.[0] || "";
  const lastName = patient.name?.[0].family || "";
  const gender = patient.gender || "";
  const birthDate = patient.birthDate || "";
  const age = getAge(birthDate);
  const country = patient.address?.[0].country || "";
  const city = patient.address?.[0].city || "";
  const postalCode = patient.address?.[0].postalCode || "";
  const phoneNumber = patient.telecom?.[0].value || "";
  const street = patient.address?.[0].line?.[0] || "";
  const id = patient.id || "";
  return {
    firstName,
    lastName,
    gender,
    age,
    birthDate,
    country,
    city,
    postalCode,
    phone: phoneNumber,
    street,
    id,
  };
};

export const generateUniqueId = (): string => {
  return uuid();
};
