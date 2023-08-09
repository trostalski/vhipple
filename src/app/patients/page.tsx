"use client";
import React from "react";
import MainWrapper from "../components/MainWrapper";
import PatientsHeader from "./components/PatientsHeader";
import PatientsList from "./components/PatientsList";

const page = () => {
  return (
    <MainWrapper>
      <div className="flex flex-col">
        <PatientsHeader />
        <PatientsList />
      </div>
    </MainWrapper>
  );
};

export default page;
