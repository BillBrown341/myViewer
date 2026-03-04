import { VisualizationDescriptor } from "../../dataTypes";
import PMConfigFormComponent from "./PMConfigFormComponent";
import PointMarkerBuilder from "./PMBuilder";

const PointmarkerDescriptor: VisualizationDescriptor = {
  label: "Point Marker",
  id: "pointmarker",
  viewLocation: "Map",
  icon: "bi-geo-alt-fill",
  description: "Displays a single geographic point",
  formComponents: [
    {
      id: "pmConfig",
      label: "Configure Pointmarker Layer",
      Component: PMConfigFormComponent
    }
  ],
  builder: PointMarkerBuilder
};

export default PointmarkerDescriptor;