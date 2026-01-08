import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { VisualizationDescriptor } from "../../dataTypes";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Stores/storeRegistry";
import { updateViz } from "../../Stores/currentVizStore";

export default function SelectOptionsComponent(
    { vizDescriptor, selectedViz, setSelectedViz }:{
        vizDescriptor: VisualizationDescriptor;
        selectedViz: VisualizationDescriptor | null;
        setSelectedViz: React.Dispatch<React.SetStateAction<VisualizationDescriptor | null>>;
    })
{
    const dispatch = useDispatch<AppDispatch>()

    const handleSelectViz = (viz: VisualizationDescriptor) => { 
        setSelectedViz(viz)
        // Begin Creating a an Object for the form. Eventually, this will be used in a visualizations builder.
        dispatch(updateViz({ type: viz.id }));
    };

    
    

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