export interface VisTimelineData {
  id: string;
  content: string;
  start: string;
  className?: string;
}

export interface VisNetworkData {
  nodes: {
    id: string;
    label: string;
  }[];
  edges: {
    from: string;
    to: string;
  }[];
}
