"use client";
import MainWrapper from "@/app/components/MainWrapper";
import SearchBar from "@/app/components/SearchBar";
import React, { useState } from "react";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {};

  return (
    <MainWrapper>
      <div className="flex flex-col">
        <div>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            placeholder="Search"
          />
        </div>
        <div>
          <div className="grid grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center bg-white font-bold rounded-md shadow-md py-4 transition hover:shadow-xl hover:cursor-pointer group">
              <span className="text-2xl text-gray-500 group-hover:text-primary-button-hover">
                Patients
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white font-bold rounded-md shadow-md py-4 transition hover:shadow-xl hover:cursor-pointer group">
              <span className="text-2xl text-gray-500 group-hover:text-primary-button-hover">
                Resources
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white font-bold rounded-md shadow-md py-4 transition hover:shadow-xl hover:cursor-pointer group">
              <span className="text-2xl text-gray-500 group-hover:text-primary-button-hover">
                Charts
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white font-bold rounded-md shadow-md py-4 transition hover:shadow-xl hover:cursor-pointer group">
              <span className="text-2xl text-gray-500 group-hover:text-primary-button-hover">
                Cohorts
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default page;
