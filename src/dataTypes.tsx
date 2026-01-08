import React from 'react';


// These are the basic data structures of that come from OpenSensorHub
export interface OshNetworkProperties {
    endpointUrl:string;
    streamProtocol:string;
    tls:boolean;
    connectorOpts?:Object
}

export interface OshSystem {
  networkProperties:OshNetworkProperties,
  type:string;
  id:string;
  uid: string;
  featureType:string;
  name:string;
}

export interface OshDataStream {
  networkProperties:OshNetworkProperties,
  id:string;
  name:string;
  outputName:string;
  system:{
    id:string;
    href:string;
    uid:string;
  };
  schema:Object;
}

export interface OshNode {
  nodename: string;
  id:string;
  networkProperties:OshNetworkProperties;
  systems: OshSystem[];
  datastreams:OshDataStream[];  
}
export interface OshVisualization {
  type: string | null;
  dataSources: any[] | null;
}

export interface VisualizationDescriptor {
  id:string;
  label:string;
  viewLocation: "Map" | "Chart" | "Panel";
  icon:string | React.ReactNode;
  description:string;
  formOptions?: VisualizationFormOption[]; //An array of components for step in the visualization form.
}

export interface VisualizationFormOption {
  id: string;
  label: string;
  Component: React.FC<VizFormOptionProps>; // The Props 
}
// this defines the properties required by each form component in the descriptor
export interface VizFormOptionProps {
  onCommitViz: (partialViz:Record<string,any>) => void;     // Each form option requires an onCommit function that update the current visualization
}
