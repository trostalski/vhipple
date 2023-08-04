import ModalWrapper from "@/app/components/ModalWrapper";
import { addDashboardCard, getDatasets } from "@/app/db/utils";
import { availableChartTypes } from "@/app/lib/constants";
import { DashboardCard } from "@/app/lib/types";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import Select from "react-select";
import { defaultCard, exampleCards } from "../lib/constants";
import { toastError, toastSuccess } from "@/app/lib/toasts";
import { createChartJsData } from "@/app/dashboard/lib/utils";

interface AddCardModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  card?: DashboardCard;
}

const AddCardModal = (props: AddCardModalProps) => {
  const [card, setCard] = useState<DashboardCard>(
    props.card || { ...defaultCard }
  );
  const datasets = useLiveQuery(getDatasets) || [];

  const handleSubmit = async () => {
    if (!card.title) {
      toastError("Title is required.");
      return;
    }
    if (!card.chartType) {
      toastError("Chart type is required.");
      return;
    }
    if (!card.datasetNames.length) {
      toastError("At least one dataset is required.");
      return;
    }
    if (!card.fhirpath) {
      toastError("FHIRPath is required.");
      return;
    }
    const inputDatasets = datasets.filter((d) =>
      card.datasetNames.includes(d.name)
    );
    const chartJsData = createChartJsData(inputDatasets, card.fhirpath);
    card.data = chartJsData;
    const res = await addDashboardCard(card);
    if (res) {
      toastSuccess("Card added successfully.");
      props.setShowModal(false);
    } else {
      toastError("Something went wrong.");
    }
  };

  return (
    <ModalWrapper setShowModal={props.setShowModal} showModal={props.showModal}>
      <div className="flex flex-row justify-between items-center py-2 px-4">
        <h1 className="text-2xl font-bold">CREATE CARD</h1>
      </div>
      <div className="flex flex-col justify-between items-center py-2 px-4">
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="template">
            From Template
          </label>
          <Select
            name="template"
            id="template"
            options={exampleCards.map((c) => ({
              label: c.title,
              value: c.title,
            }))}
            onChange={(e) => {
              if (!e) return;
              const template = exampleCards.find((c) => c.title === e.value);
              if (template) {
                setCard({ ...template });
              }
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="name">
            Title
          </label>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type="text"
            name="name"
            id="name"
            value={card.title}
            onChange={(e) => setCard({ ...card, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            className="border border-gray-300 p-2 rounded-lg max-h-32 resize-none"
            rows={2}
            name="description"
            id="description"
            value={card.description}
            onChange={(e) => setCard({ ...card, description: e.target.value })}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="description">
            Chart Type
          </label>
          <Select
            name="chartType"
            id="chartType"
            value={{ label: card.chartType, value: card.chartType }}
            options={availableChartTypes.map((c) => ({
              label: c,
              value: c,
            }))}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="description">
            Datasets
          </label>
          <Select
            options={datasets!.map((d) => ({
              label: d.name,
              value: d.name,
            }))}
            isMulti={true}
            value={card.datasetNames.map((d) => ({
              label: d,
              value: d,
            }))}
            onChange={(e) =>
              setCard({
                ...card,
                datasetNames: e.map((d) => d.value),
              })
            }
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="fhirpath">
            Value FHIRPath
          </label>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type="text"
            name="fhirpath"
            id="fhirpath"
            value={card.fhirpath}
            onChange={(e) => setCard({ ...card, fhirpath: e.target.value })}
          />
        </div>
        <div className="flex flex-row justify-end items-center w-full mt-4">
          <button
            className="bg-gray-200 text-gray-700 p-2 rounded-lg"
            onClick={() => props.setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg ml-2"
            onClick={() => {
              console.log("SBUTMI");
              handleSubmit();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddCardModal;
