import React from "react";
import { DashboardCard } from "../../lib/types";
import LabelsInput from "../../components/ChartDisplay/LabelsInput";
import YAxisRangeInput from "../../components/ChartDisplay/YAxisRangeInput";
import LegendInput from "../../components/ChartDisplay/LegendInput";
import DatasetColorInput from "../../components/ChartDisplay/DatasetColorInput";

interface ChartDisplaySettingsProps {
  card: DashboardCard;
  previewCard: DashboardCard;
  setPreviewCard: (card: DashboardCard) => void;
  setCard: (card: DashboardCard) => void;
}

const ChartDisplaySettings = (props: ChartDisplaySettingsProps) => {
  const { previewCard, card, setPreviewCard, setCard } = props;
  return (
    <>
      <div className="flex flex-col">
        <LabelsInput
          card={card}
          onChangeXLabels={(e) => {
            setCard({ ...card, showXLabels: !card.showXLabels });
            setPreviewCard({ ...card, showXLabels: !card.showXLabels });
          }}
          onChangeYLabels={(e) => {
            setCard({ ...card, showYLabels: !card.showYLabels });
            setPreviewCard({ ...card, showYLabels: !card.showYLabels });
          }}
        />
      </div>
      <div className="flex flex-col">
        <YAxisRangeInput
          card={card}
          onChangeYMax={(e) => {
            setPreviewCard({ ...previewCard, yMax: e.target.value });
            setCard({ ...card, yMax: e.target.value });
          }}
          onChangeYMin={(e) => {
            setPreviewCard({ ...previewCard, yMin: e.target.value });
            setCard({ ...card, yMin: e.target.value });
          }}
        />
      </div>
      <div>
        <LegendInput
          card={card}
          onChangeLegendPosition={(e) => {
            setPreviewCard({ ...previewCard, legendPosition: e.target.value });
            setCard({ ...card, legendPosition: e.target.value });
          }}
          onChangeShowLegend={(e) => {
            setPreviewCard({ ...previewCard, showLegend: !card.showLegend });
            setCard({ ...card, showLegend: e.target.checked });
          }}
        />
      </div>
      <div className="col-span-2">
        <DatasetColorInput
          card={card}
          onChange={(e, itemId) => {
            const newColorPallets = card.cohortColorPalletes.map((c) => {
              if (c.id === itemId) {
                return {
                  ...c,
                  chartColour: e.target.value,
                };
              }
              return c;
            });

            setPreviewCard({
              ...previewCard,
              cohortColorPalletes: newColorPallets,
            });

            setCard({
              ...card,
              cohortColorPalletes: newColorPallets,
            });
          }}
        />
      </div>
    </>
  );
};

export default ChartDisplaySettings;
