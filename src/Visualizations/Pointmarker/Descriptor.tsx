import { VisualizationDescriptor } from "../../dataTypes";
import PMConfigFormComponent from "./PMConfigFormComponent";

const PointmarkerDescriptor: VisualizationDescriptor = {
  label: "Point Marker",
  id: "pointmarker",
  viewLocation: "Map",
  icon: "bi-geo-alt-fill",
  description: "Displays a single geographic point",
  formOptions: [
    {
      id: "pmConfig",
      label: "Configure Pointmarker Layer",
      Component: PMConfigFormComponent
    }
    // ,
    // {
    //   id: "test",
    //   label: "More Data",
    //   Component: SelectDataFormComponent
    // }
    //   id: "style",
    //   label: "Customize",
    //   Component: CustomizePM
    // }
  ]
};

export default PointmarkerDescriptor;