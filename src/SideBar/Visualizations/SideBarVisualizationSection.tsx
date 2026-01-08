import React, { useState } from "react";
import '../sidebar.css'
import AddVisualizationForm from "../../Forms/AddVisualizationForm";
import { useSelector } from "react-redux";
import { RootState } from "../../Stores/storeRegistry";
// import NodeSideBarComponent from "./NodeSideBarComponent";


export default function SideBarNodesSection(){
    
    // const allVisualizations = useSelector(
    //     (state:RootState)=>state.vizStore.allVisualizations
    // )


    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="text-uppercase text-muted mb-0">Visualizations</h6>
            </div>
            {/* <ul className="list-unstyled mb-4">
                {allVisualizations.map((viz)=>(
                    <VizSideBarComponent key={viz.id} viz={viz} />                    
                ))}
                
            </ul> */}
        </>            
    )
}