import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { VisualizationDescriptor } from "../../../dataTypes";

export default function VisualizationSelectionOption({ vizDescriptor, selectedViz, setSelectedViz }){

    const handleSelectViz = (viz: VisualizationDescriptor) => { setSelectedViz(viz) };

    return (
        <button
            key={vizDescriptor.id}
            type="button"
                className={`btn ${
                selectedViz?.id === vizDescriptor.id
                    ? "btn-primary"
                    : "btn-outline-primary"
            }`}
                onClick={() => handleSelectViz(vizDescriptor)}
        >
            {typeof vizDescriptor.icon === "string" ? (
            <i className={`${vizDescriptor.icon} me-2`} />
            ) : (
            vizDescriptor.icon
            )}
            {vizDescriptor.label}
        </button>
    )

}