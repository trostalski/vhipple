import React, { memo, useEffect, useState } from "react";
import { Network } from "vis-network/standalone";
import LoadingScreen from "@/app/components/LoadingScreen";
import { Resource } from "fhir/r4";
import {
  convertResourcesToVisNetwork,
  getDisplayForResource,
  getValueDisplay,
} from "../../lib/utils";
import { PatientData } from "../../lib/patientData";
import { VisNetworkData } from "../../lib/types";

interface VisNetworkProps {
  patientData: PatientData;
}

const VisNetwork = (props: VisNetworkProps) => {
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [graphData, setGraphData] = useState<VisNetworkData | undefined>(
    undefined
  );
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.patientData.loadGraphData().then((data) => {
      setGraphData(data);
      if (ref.current) {
        const network = new Network(ref.current, data, {
          nodes: {
            shape: "box",
            color: {
              background: "#3B8BF6",
              border: "#000",
              highlight: {
                background: "#0066CC",
                border: "#000",
              },
            },
            font: {
              color: "#fff",
            },
          },
          edges: {
            color: {
              color: "#000",
              highlight: "#000",
            },
          },
          interaction: {
            hover: true,
          },
          layout: {
            improvedLayout: false,
            randomSeed: 191006,
          },
          physics: {
            enabled: true,
            repulsion: {},
            stabilization: {
              iterations: 500,
              updateInterval: 10,
            },
          },
        });
        // uncomment if you want to disable physics after stabilization
        network.on("stabilizationIterationsDone", function () {
          network.setOptions({ physics: false });
          setGraphLoaded(true);
        });
        network.on("click", function (properties) {
          if (properties.nodes.length > 0) {
            setSelectedItem(properties.nodes[0]);
          } else {
            setSelectedItem(undefined);
          }
        });
      }
    });
  }, []);

  const selectedItemDisplay = () => {
    const targetId =
      selectedItem +
      "/" +
      graphData?.nodes.find((d) => d.id == selectedItem)!.label;
    if (selectedItem) {
      const r = props.patientData.connectedResources.find(
        (r) => r.id + "/" + r.resourceType == targetId
      );
      if (r) {
        let display = getDisplayForResource(r);
        if (r.resourceType === "Observation") {
          const value = getValueDisplay(r, true);
          display = display + ": " + value;
        }
        return display;
      }
    }
  };

  return (
    <>
      <div className="relative flex w-full h-full rounded-md shadow-xl bg-white overflow-scroll">
        {selectedItem && (
          <div className="bg-white p-8 text-lg absolute top-0 right-0 z-10">
            {selectedItemDisplay()}
          </div>
        )}
        <div
          className="w-full h-full justify-center items-center"
          ref={ref}
        ></div>
      </div>
      {graphLoaded ? null : <LoadingScreen />}
    </>
  );
};

export default memo(VisNetwork);
