import ModalWrapper from "@/app/components/ModalWrapper";
import {
  addDashboardCard,
  dashboardCardExists,
  getDatasets,
  updateDashboardCard,
} from "@/app/db/utils";
import { DashboardCard } from "@/app/lib/types";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import Select from "react-select";
import {
  availableChartColours,
  availableChartTypes,
  availableDataTypes,
  categoricalDataType,
  defaultCard,
  exampleCards,
} from "../lib/constants";
import { toastError, toastSuccess } from "@/app/lib/toasts";
import {
  createCatChartJsData,
  evalFhirPathOnDatasets,
  getChartTypeOptions,
} from "@/app/dashboard/lib/utils";
import { addMode, editMode } from "@/app/datasets/lib/constants";
import FhirPathPreviewMenu from "./FhirPathPreviewMenu";

interface AddCardModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  mode: "add" | "edit";
  card?: DashboardCard;
}

const AddCardModal = (props: AddCardModalProps) => {
  const [card, setCard] = useState<DashboardCard>(
    props.card || { ...defaultCard }
  );
  const [dataType, setDataType] =
    useState<(typeof availableDataTypes)[number]>(categoricalDataType);
  const [showFhirPathPreview, setShowFhirPathPreview] = useState(false);

  const datasets = useLiveQuery(getDatasets) || [];
  const prevTitle = props.card?.title || "";

  const handleSubmit = async () => {
    if (!card.title) {
      toastError("Title is required.");
      return;
    }
    if (!card.chartType) {
      toastError("Chart type is required.");
      return;
    }
    if (!card.datasets.length) {
      toastError("At least one dataset is required.");
      return;
    }
    if (!card.fhirpath) {
      toastError("FHIRPath is required.");
      return;
    }
    const inputDatasets = datasets.filter((d) =>
      card.datasets.map((d) => d.name).includes(d.name)
    );
    const chartJsData = createCatChartJsData(inputDatasets, card.fhirpath);
    card.data = chartJsData;
    if (props.mode === addMode) {
      if (await dashboardCardExists(card.title)) {
        toastError("Card with this title already exists.");
        return;
      }
      const res = await addDashboardCard(card);
      if (res) {
        toastSuccess("Card added successfully.");
        props.setShowModal(false);
      } else {
        toastError("Something went wrong.");
      }
    } else if (props.mode === editMode) {
      const res = await updateDashboardCard(prevTitle, card);
      if (res) {
        toastSuccess("Card updated successfully.");
        props.setShowModal(false);
      } else {
        toastError("Something went wrong.");
      }
    }
  };

  const chartTypeOptions = getChartTypeOptions(dataType);

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
          <label className="text-gray-700" htmlFor="data-type">
            Data Type
          </label>
          <select
            name="data-type"
            className="border border-gray-300 p-2 rounded-lg"
            id="data-type"
            value={dataType}
            onChange={(e) => setDataType(e?.target.value)}
          >
            {availableDataTypes.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="chart-type">
            Chart Type
          </label>
          <select
            name="chart-type"
            className="border border-gray-300 p-2 rounded-lg"
            id="char-type"
            value={card.chartType}
            onChange={(e) => setCard({ ...card, chartType: e.target.value })}
          >
            {chartTypeOptions!.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
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
            value={card.datasets.map((d) => ({
              label: d.name,
              value: d.name,
            }))}
            onChange={(e) => {
              setCard({
                ...card,
                datasets: e.map((d, i) => ({
                  name: d.value,
                  chartColour:
                    availableChartColours[i % availableChartColours.length]
                      .name,
                })),
              });
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="fhirpath">
            Value FHIRPath
          </label>
          <div className="relative flex flex-row gap-4 w-full">
            <input
              className="border w-full border-gray-300 p-2 rounded-lg"
              type="text"
              name="fhirpath"
              id="fhirpath"
              value={card.fhirpath}
              onChange={(e) => setCard({ ...card, fhirpath: e.target.value })}
            />
            <button
              className={`p-2 rounded-md bg-orange-400 text-white ${
                !card.fhirpath && "bg-green-100 cursor-not-allowed"
              }`}
              disabled={!card.fhirpath}
              onClick={() => setShowFhirPathPreview(!showFhirPathPreview)}
            >
              Preview
            </button>
            {showFhirPathPreview && (
              <FhirPathPreviewMenu
                showMenu={showFhirPathPreview}
                setShowMenu={setShowFhirPathPreview}
                fhirPathResults={evalFhirPathOnDatasets(
                  datasets,
                  card.fhirpath
                )}
              />
            )}
          </div>
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
