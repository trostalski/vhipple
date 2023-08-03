import React from "react";
import MainWrapper from "../components/MainWrapper";

const page = () => {
  return (
    <MainWrapper>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Patients</h1>
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
            New Patient
          </button>
        </div>
      </div>
    </MainWrapper>
  );
};

export default page;
