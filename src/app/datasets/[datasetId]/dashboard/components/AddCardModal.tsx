import ModalWrapper from "@/app/components/ModalWrapper";
import {
  addDashboardCard,
  dashboardCardExists,
  getDashboardCards,
  getDatasets,
  updateDashboardCard,
} from "@/app/db/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import Select from "react-select";
import {
  availableChartColours,
  availableDataTypes,
  numerical1DDataType,
} from "../lib/constants";
import { toastError, toastSuccess } from "@/app/lib/toasts";
import {
  createChartJsDataForDashboardCard,
  getChartTypeOptions,
  validateDashboardCardInput,
} from "@/app/datasets/[datasetId]/dashboard/lib/utils";
import { addMode, editMode } from "@/app/datasets/lib/constants";
import FhirPathInput from "./FhirPathInput";
import { DashboardCard } from "../lib/types";
import { generateUniqueId } from "@/app/lib/utils";
import { defaultCard, availableExampleCards } from "../lib/exampleCards";

interface AddCardModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  mode: "add" | "edit";
  card?: DashboardCard;
}

const AddCardModal = (props: AddCardModalProps) => {
  const { showModal, setShowModal, mode, card: initialCard } = props;
  const [card, setCard] = useState<DashboardCard>(
    initialCard || { ...defaultCard }
  );

  const datasets = useLiveQuery(getDatasets) || [];
  const dashboardCards = useLiveQuery(getDashboardCards) || [];
  const prevId = card?.id || "";

  const handleSubmit = async () => {
    const cardIsValid = validateDashboardCardInput(card);
    if (!cardIsValid) {
      return;
    }
    const inputDatasets = datasets.filter((d) =>
      card.cohortColorPalletes.map((d) => d.name).includes(d.name)
    );
    card.data = createChartJsDataForDashboardCard(inputDatasets, card);
    if (mode === addMode) {
      if (await dashboardCardExists(card.title)) {
        toastError("Card with this title already exists.");
        return;
      }
      card.id = generateUniqueId();
      card.positionIndex = dashboardCards.length;
      card.createdAt = new Date().toISOString();
      card.updatedAt = new Date().toISOString();
      const res = await addDashboardCard(card);
      if (res) {
        toastSuccess("Card added successfully.");
        setShowModal(false);
      } else {
        toastError("Something went wrong.");
      }
    } else if (mode === editMode) {
      card.updatedAt = new Date().toISOString();
      const res = await updateDashboardCard(prevId, card);
      if (res) {
        toastSuccess("Card updated successfully.");
        setShowModal(false);
      } else {
        toastError("Something went wrong.");
      }
    }
  };

  const chartTypeOptions = getChartTypeOptions(card.dataType);
  const exampleCards = availableExampleCards.filter(
    (c) => c.dataType == card.dataType
  );

  return (
    <ModalWrapper setShowModal={setShowModal} showModal={showModal}>
      <div className="flex flex-row justify-between items-center py-2 px-4">
        <h1 className="text-2xl font-bold">Create Card</h1>
      </div>
      <div className="flex flex-col justify-between items-center py-2 px-4">
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="data-type">
            Data Type
          </label>
          <select
            name="data-type"
            className="border border-gray-300 p-2 rounded-lg"
            id="data-type"
            value={card.dataType}
            onChange={(e) => setCard({ ...card, dataType: e.target.value })}
          >
            {availableDataTypes.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-700" htmlFor="template">
            From Template
          </label>
          <Select
            name="template"
            id="template"
            options={exampleCards.map((c) => ({
              label: c!.title,
              value: c!.title,
            }))}
            onChange={(e) => {
              if (!e) return;
              const template = exampleCards.find((c) => c!.title === e.value);
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
              value: d.id,
            }))}
            isMulti={true}
            value={card.cohortColorPalletes.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
            onChange={(e) => {
              setCard({
                ...card,
                cohortColorPalletes: e.map((d, i) => ({
                  name: d.label,
                  id: d.value,
                  chartColour:
                    availableChartColours[i % availableChartColours.length]
                      .name,
                })),
              });
            }}
          />
        </div>
        <FhirPathInput
          inputLabel="Value Fhirpath"
          card={card}
          setCard={setCard}
          value={card.valueFhirpath}
          onChangeHandler={(e) => {
            setCard({ ...card, valueFhirpath: e.target.value });
          }}
        />
        {card.dataType == numerical1DDataType && (
          <FhirPathInput
            inputLabel="Label Fhirpath"
            card={card}
            setCard={setCard}
            value={card.labelFhirpath}
            onChangeHandler={(e) => {
              setCard({ ...card, labelFhirpath: e.target.value });
            }}
          />
        )}

        <div className="flex flex-row justify-end items-center w-full mt-4">
          <button
            className="bg-gray-200 text-gray-700 p-2 rounded-lg"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg ml-2"
            onClick={() => {
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
