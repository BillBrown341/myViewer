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

export interface VisualizationDescriptor {
  id:string;
  label:string;
  icon:string | React.ReactNode;
  description:string;
}