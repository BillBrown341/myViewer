import { VisualizationDescriptor } from "../dataTypes";

// Add the descriptor for each visualization you want in your project
import PointmarkerDescriptor from "./Pointmarker/Descriptor";
import LoBDescriptor from "./LoB/Descriptor";

export const visualizationRegistry: VisualizationDescriptor[] = [
  PointmarkerDescriptor,
  LoBDescriptor,
];