import React, { useState } from "react";

const useJoyRide = () => {
  const [{ run: runDatasets, steps: stepsDatasets }, setStateDatasets] =
    useState({
      run: true,
      steps: [
        {
          target: "#add-dataset-button",
          content: "Press this button to add a new dataset.",
        },
      ],
    });

  const [{ run: runAddDataset, steps: stepsAddDataset }, setStateAddDataset] =
    useState({
      run: true,
      steps: [
        {
          target: "#bundle-upload-div",
          content: "Upload FHIR R4 Bundles to your dataset.",
        },
      ],
    });

  const [{ run: runDataset, steps: stepsDataset }, setStateDataset] = useState({
    run: true,
    steps: [
      {
        target: "#overviewSidebarNavIcon",
        content: "Click here to view the overview of your dataset.",
      },
      {
        target: "#dashboardsSidebarNavIcon",
        content: "Click here to view the dashboards of your dataset.",
      },
      {
        target: "#patientsSidebarNavIcon",
        content: "Click here to view the patients of your dataset.",
      },
      {
        target: "#exportSidebarNavIcon",
        content: "Click here to export your dataset.",
      },
    ],
  });

  return {
    joyrideDatasets: {
      run: runDatasets,
      steps: stepsDatasets,
      setState: setStateDatasets,
    },
    joyrideAddDataset: {
      run: runAddDataset,
      steps: stepsAddDataset,
      setState: setStateAddDataset,
    },
    joyrideDataset: {
      continuous: true,
      run: runDataset,
      steps: stepsDataset,
      setState: setStateDataset,
    },
  };
};

export default useJoyRide;
