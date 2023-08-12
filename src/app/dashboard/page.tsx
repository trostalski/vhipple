import React from "react";
import MainWrapper from "../components/MainWrapper";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCardList from "./components/DashboardCardList";

const page = () => {
  return (
    <MainWrapper>
      <div className="flex flex-col w-full h-full shrink-0">
        <DashboardHeader />
        <DashboardCardList />
      </div>
    </MainWrapper>
  );
};

export default page;
