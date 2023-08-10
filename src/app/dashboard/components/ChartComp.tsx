import { generateColourPalette, sliceChartJsData } from "../lib/utils";
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
  BoxAndWiskers
);

const ChartComp = (props: ChartCompProps) => {
  const yMin = props.card.yMin === "" ? undefined : props.card.yMin;
  const yMax = props.card.yMax === "" ? undefined : props.card.yMax;

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: props.card.showXLables,
      },
      y: {
        display: props.card.showYLables,
        min: Number(yMin),
        max: Number(yMax),
      },
    },
    plugins: {
      legend: {
        display: props.card.showLegend,
        position: props.card.legendPosition,
      },
    },
  };

  // only show card.numDataPoints number of data points
  let displayData;
  if (props.card.data) {
    displayData = sliceChartJsData(
      props.card.data,
      props.card.numDataPoints,
      props.card.datasets.map((d) => d.chartColour)
    );
  } else {
    return <span className="text-gray-500">No Data.</span>;
  }
  return (
    <div className="h-full overflow-hidden">
      {props.card.chartType === "bar" && (
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
      {props.card.chartType === "pie" && (
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
      {props.card.chartType === "doughnut" && (
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
      {props.card.chartType === "polar" && (
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
      {props.card.chartType === "radar" && (
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
      {props.card.chartType === "boxplot" && (
        <Chart
          type={"boxplot" as any}
          data={displayData as any}
          options={options as any}
        />
      )}
      {props.card.chartType === "line" && (
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
