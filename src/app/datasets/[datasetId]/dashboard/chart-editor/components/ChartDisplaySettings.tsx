import React from "react";
import { DashboardCard } from "../../lib/types";
import LabelsInput from "../../components/ChartDisplay/LabelsInput";
import YAxisRangeInput from "../../components/ChartDisplay/YAxisRangeInput";
import LegendInput from "../../components/ChartDisplay/LegendInput";
import DatasetColorInput from "../../components/ChartDisplay/DatasetColorInput";

interface ChartDisplaySettingsProps {
  card: DashboardCard;
  setCard: (card: DashboardCard) => void;
}

const ChartDisplaySettings = (props: ChartDisplaySettingsProps) => {
  const { card, setCard } = props;
  return (
    <>
      <div className="flex flex-col">
        <LabelsInput
          card={card}
          onChangeXLabels={(e) =>
            setCard({ ...card, showXLables: e.target.checked })
          }
          onChangeYLabels={(e) =>
            setCard({ ...card, showYLables: e.target.checked })
          }
        />
      </div>
      <div className="flex flex-col">
        <YAxisRangeInput
          card={card}
          onChangeYMax={(e) => setCard({ ...card, yMax: e.target.value })}
          onChangeYMin={(e) => setCard({ ...card, yMin: e.target.value })}
        />
      </div>
      <div>
        <LegendInput
          card={card}
          onChangeLegendPosition={(e) =>
            setCard({ ...card, legendPosition: e.target.value })
          }
          onChangeShowLegend={(e) =>
            setCard({ ...card, showLegend: e.target.checked })
          }
        />
      </div>
      <div className="col-span-2">
        <DatasetColorInput
          card={card}
          onChange={(e, itemId) =>
            setCard({
              ...card,
              cohortColorPalletes: card.cohortColorPalletes.map((c) => {
                if (c.id === itemId) {
                  return {
                    ...c,
                    chartColour: e.target.value,
                  };
                }
                return c;
              }),
            })
          }
        />
      </div>
    </>
  );
};

export default ChartDisplaySettings;
