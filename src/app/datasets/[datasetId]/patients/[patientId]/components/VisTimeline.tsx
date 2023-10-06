import React, { memo, useEffect, useState } from "react";
import { Timeline } from "vis-timeline/standalone";
import { Resource } from "fhir/r4";
import { convertResourcesToVisTimeline } from "../../lib/utils";
import {
  getDisplayForResource,
  getValueDisplay,
} from "@/app/lib/resourceTypeDisplay";
import "../styles/timeline.css";
import { VisTimelineData } from "../../lib/types";

interface VisTimelineProps {
  resources: Resource[];
}

const VisTimeline = (props: VisTimelineProps) => {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const data: VisTimelineData[] = convertResourcesToVisTimeline(
    props.resources
  );
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const timeline = new Timeline(ref.current, data, {
        height: "100%",
        horizontalScroll: true,
        verticalScroll: true,
        moveable: true,
        zoomKey: "shiftKey",
      });
      timeline.on("click", function (properties) {
        if (properties.item) {
          setSelectedItem(properties.item);
        } else if (properties.item == null) {
          setSelectedItem(undefined);
        }
      });
    }
  }, []);

  const selectedItemDisplay = () => {
    const targetId =
      selectedItem + "/" + data.find((d) => d.id == selectedItem)!.content;
    if (selectedItem) {
      const r = props.resources.find(
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
    <div className="relative">
      <div
        className="relative bg-white justify-center items-center h-screen w-full"
        ref={ref}
      />
      {selectedItem && (
        <div className="bg-white p-8 text-lg absolute top-0 right-0 z-10">
          {selectedItemDisplay()}
        </div>
      )}
    </div>
  );
};

export default memo(VisTimeline);
