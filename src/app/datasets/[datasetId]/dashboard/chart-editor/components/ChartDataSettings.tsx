import React, { useState } from "react";
import {
  allPatientsCohortId,
  availableChartColours,
  availableChartTypes,
  numerical1DChartTypes,
} from "../../lib/constants";
import { DashboardCard } from "../../lib/types";
import { availableExampleCards } from "../../lib/exampleCards";
import Select from "react-select";
import { reactSelectStyles } from "@/app/lib/constants";
import { OptionType } from "@/app/lib/types";
import FhirPathInput from "../../components/FhirPathInput";
import { Dataset } from "@/app/datasets/lib/types";
import { Resource } from "fhir/r4";
import { getResourcesForCohort } from "@/app/datasets/lib/cohortUtils";
import CohortSelect from "../../../components/CohortSelect";

interface ChartDataSettingsProps {
  card: DashboardCard;
  setCard: (card: DashboardCard) => void;
  dataset: Dataset;
  patientCohortOptions: OptionType[];
  showPreviewCard: (baseCard: DashboardCard) => void;
  handleSave: (baseCard: DashboardCard) => void;
}

const ChartDataSettings = (props: ChartDataSettingsProps) => {
  const {
    card,
    setCard,
    patientCohortOptions,
    dataset,
    showPreviewCard,
    handleSave,
  } = props;
  const [selectedTemplateId, setSelectedTemplateId] = useState<
    OptionType | undefined
  >(undefined);

  const exampleOptions = availableExampleCards.map((c) => ({
    value: c.id,
    label: c.title,
  }));

  const chartTypeOptions = availableChartTypes.map((c) => ({
    value: c,
    label: c,
  }));

  const computeResources = () => {
    let resources: Resource[] = [];
    if (
      card.cohortColorPalletes.length === 0 ||
      card.cohortColorPalletes[0].id === allPatientsCohortId
    ) {
      resources = dataset.resourceContainers.map((rc) => rc.resource);
    } else {
      const cohortIds = card.cohortColorPalletes.map((c) => c.id);
      cohortIds.forEach((id) => {
        const patientCohort = dataset.patientCohorts.find((pc) => pc.id === id);
        if (!patientCohort) {
          throw new Error(`Cohort with id ${id} not found`);
        }
        const cohortResources = getResourcesForCohort(patientCohort, dataset);
        resources.push(...cohortResources);
      });
    }
    return resources.flat();
  };

  const handleChangeTemplate = (template?: OptionType) => {
    if (!template) {
      return;
    }
    const selectedTemplate = availableExampleCards.find(
      (c) => c.title === template.label
    );
    if (selectedTemplate) {
      setCard(selectedTemplate);
    }
  };

  const handleChangeChartType = (e?: OptionType) => {
    if (!e) {
      return;
    }
    setCard({ ...card, chartType: e.value });
  };

  const handleChangeCohort = (e?: OptionType[]) => {
    if (!e) {
      return;
    }
    setCard({
      ...card,
      cohortColorPalletes: e.map((d, i) => ({
        name: d.label,
        id: d.value,
        chartColour:
          availableChartColours[i % availableChartColours.length].name,
      })),
    });
  };

  const handleTextOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    property: string
  ) => {
    setCard({ ...card, [property]: e.target.value });
  };

  return (
    <div
      id="ce-settings-container"
      className="flex flex-col shrink-0 h-full w-1/4 bg-gray-50 shadow-xl rounded-md px-4 py-2"
    >
      <div className="flex flex-col h-full gap-4 overflow-scroll">
        <div className="flex flex-col">
          <label className="font-bold">From Template</label>
          <Select
            id="ce-template-select"
            placeholder="Select Template"
            getOptionValue={(option) => option.label}
            getOptionLabel={(option) => option.label}
            value={selectedTemplateId}
            styles={reactSelectStyles}
            options={exampleOptions}
            onChange={(e) => handleChangeTemplate(e as OptionType)}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Chart Title</label>
          <input
            value={card.title}
            type="text"
            className="rounded-md p-2 border"
            onChange={(e) => handleTextOnChange(e, "title")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Chart Description</label>
          <textarea
            value={card.description}
            className="rounded-md p-2 border resize-none"
            rows={2}
            onChange={(e) => handleTextOnChange(e, "description")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Chart Type</label>
          <Select
            id="ce-chart-type-select"
            styles={reactSelectStyles}
            options={chartTypeOptions}
            value={{ value: card.chartType, label: card.chartType }}
            onChange={(e) => handleChangeChartType(e as OptionType)}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Group by Cohorts</label>
          <CohortSelect
            handleChangeCohort={handleChangeCohort}
            patientCohortOptions={patientCohortOptions}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Select Data</label>
          <FhirPathInput
            inputLabel="Value Fhirpath"
            value={card.valueFhirpath}
            onChangeHandler={(e) => {
              setCard({ ...card, valueFhirpath: e.target.value });
            }}
            resources={computeResources()}
          />
          {numerical1DChartTypes.includes(card.chartType) && (
            <FhirPathInput
              inputLabel="Label Fhirpath"
              value={card.labelFhirpath}
              onChangeHandler={(e) => {
                setCard({ ...card, labelFhirpath: e.target.value });
              }}
              resources={computeResources()}
            />
          )}
        </div>
      </div>
      <div className="grow" />
      <div className="flex flex-row justify-end gap-2">
        <button
          className="rounded-md px-4 py-2 bg-white border border-secondary-button transition hover:text-secondary-button-hover"
          onClick={() => showPreviewCard(card)}
        >
          Preview
        </button>
        <button
          className="rounded-md px-4 py-2 text-white bg-secondary-button transition hover:bg-secondary-button-hover"
          onClick={() => {
            handleSave(card);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChartDataSettings;
