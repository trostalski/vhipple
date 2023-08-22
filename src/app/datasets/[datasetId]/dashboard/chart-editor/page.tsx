"use client";
import MainWrapper from "@/app/components/MainWrapper";
import React from "react";
import { DashboardCard } from "../lib/types";
import { defaultCard } from "../lib/exampleCards";
import ChartEditor from "./components/ChartEditor";
import { useSearchParams } from "next/navigation";
import { addMode, editMode } from "@/app/datasets/lib/constants";
import { getDataset } from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import { SaveModes } from "@/app/datasets/lib/types";
import { getDashboardCard } from "@/app/datasets/lib/dashboardCardUtils";

const page = ({ params }: { params: { datasetId: string } }) => {
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");
  let mode: SaveModes = addMode;
  let initialCard: DashboardCard = defaultCard;

  const dataset = useLiveQuery(() => getDataset(params.datasetId))!;

  if (!dataset) {
    return null;
  }

  if (cardId) {
    mode = editMode;
    initialCard = getDashboardCard(cardId, dataset)!;
    if (!initialCard) {
      return null;
    }
  }

  return (
    <MainWrapper>
      <ChartEditor
        initialCard={initialCard}
        mode={mode}
        patientCohorts={dataset.patientCohorts}
        dataset={dataset}
      />
    </MainWrapper>
  );
};

export default page;
