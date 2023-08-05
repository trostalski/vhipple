import { DashboardCard } from "@/app/lib/types";
import { generateColourPalette } from "../lib/utils";
import { Chart, ChartData, ChartOptions } from "chart.js";
import { Bar, Doughnut, Pie, PolarArea, Radar } from "react-chartjs-2";
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
  LineElement
);

const ChartComp = (props: ChartCompProps) => {
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: props.card.showXLables,
      },
      y: {
        display: props.card.showYLables,
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
    let displayDatasets = [];
    const labels = props.card.data.labels.slice(0, props.card.numDataPoints);
    for (let i = 0; i < props.card.datasets.length; i++) {
      const dataset = props.card.data.datasets[i];
      const datasetData = dataset.data.slice(0, props.card.numDataPoints);
      console.log("CHAR COLOR: ", props.card.datasets[i].chartColour);
      const backgroundColor = generateColourPalette(
        datasetData.length,
        props.card.datasets[i].chartColour
      );
      displayDatasets.push({
        ...dataset,
        data: datasetData,
        backgroundColor: backgroundColor,
      });
    }
    displayData = {
      ...props.card.data,
      labels: labels,
      datasets: displayDatasets,
    };
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
    </div>
  );
};

export default ChartComp;
