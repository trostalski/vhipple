import { sliceChartJsData } from "../lib/utils";
import { ChartData, ChartOptions } from "chart.js";
import {
  Bar,
  Doughnut,
  Pie,
  PolarArea,
  Radar,
  Chart,
  Line,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import {
  BoxPlotController,
  BoxAndWiskers,
  ViolinController,
  Violin,
} from "@sgratzl/chartjs-chart-boxplot";
import { DashboardCard } from "../lib/types";

interface ChartCompProps {
  card: DashboardCard;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  BoxPlotController,
  ViolinController,
  Violin,
  BoxAndWiskers
);

const ChartComp = (props: ChartCompProps) => {
  const { card } = props;
  const yMin = card.yMin === "" ? undefined : card.yMin;
  const yMax = card.yMax === "" ? undefined : card.yMax;

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: card.showXLables,
      },
      y: {
        display: card.showYLables,
        min: Number(yMin),
        max: Number(yMax),
      },
    },
    plugins: {
      legend: {
        display: card.showLegend,
        position: card.legendPosition,
      },
    },
  };

  // only show card.numDataPoints number of data points
  let displayData;
  if (card.data) {
    displayData = sliceChartJsData(
      card.data,
      card.numDataPoints,
      card.cohortColorPalletes.map((d) => d.chartColour)
    );
  } else {
    return <span className="text-gray-500">No Data.</span>;
  }
  return (
    <div className="h-full overflow-hidden">
      {card.chartType === "bar" && (
        <Bar
          options={options as ChartOptions<"bar">}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={
            displayData as ChartData<
              "bar",
              (number | [number, number] | null)[],
              unknown
            >
          }
        />
      )}
      {card.chartType === "pie" && (
        <Pie
          options={options as ChartOptions<"pie">}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={
            displayData as ChartData<
              "pie",
              (number | [number, number] | null)[],
              unknown
            >
          }
        />
      )}
      {card.chartType === "doughnut" && (
        <Doughnut
          options={options as ChartOptions<"doughnut">}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={
            displayData as ChartData<
              "doughnut",
              (number | [number, number] | null)[],
              unknown
            >
          }
        />
      )}
      {card.chartType === "polar" && (
        <PolarArea
          options={options as ChartOptions<"polarArea">}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={
            displayData as ChartData<
              "polarArea",
              (number | [number, number] | null)[],
              unknown
            >
          }
        />
      )}
      {card.chartType === "radar" && (
        <Radar
          options={options as ChartOptions<"radar">}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={
            displayData as ChartData<
              "radar",
              (number | [number, number] | null)[],
              unknown
            >
          }
        />
      )}
      {card.chartType === "boxplot" && (
        <Chart
          type={"boxplot" as any}
          data={displayData as any}
          options={options as any}
        />
      )}
      {card.chartType === "violin" && (
        <Chart
          type={"violin" as any}
          data={displayData as any}
          options={options as any}
        />
      )}
      {card.chartType === "line" && (
        <Line
          options={options as ChartOptions<"line">}
          style={{
            width: "100%",
            height: "100%",
          }}
          data={
            displayData as ChartData<
              "line",
              (number | [number, number] | null)[],
              unknown
            >
          }
        />
      )}
    </div>
  );
};

export default ChartComp;
