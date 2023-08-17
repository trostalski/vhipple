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
    <div className="grid grid-cols-3 bg-gray-100 w-full h-1/6">
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
      <div>
        <DatasetColorInput card={card} />
      </div>
    </div>
  );
};

export default ChartDisplaySettings;
