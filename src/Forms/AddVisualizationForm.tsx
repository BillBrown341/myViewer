import React, { useState } from "react";
import { visualizationRegistry } from "../Visualizations/VisualizationRegistry";
import { VisualizationDescriptor } from "../dataTypes";
import SelectOptionsComponent from "./Components/SelectOptionsComponent";
import { useDispatch } from "react-redux";
import { updateViz } from "../Stores/currentVizStore";
import { store } from "../Stores/storeRegistry";
import { addDataSource, addLayer } from "../Stores/vizStore";



export default function AddVisualizationForm({ setShowForm }) {
    
    // Local State representing whatever visualization is selected on the form
    const [selectedViz, setSelectedViz] = useState<VisualizationDescriptor | null>(null);

    // Local state tracking each step in the form
    const [ formStep , setFormStep ] = useState(0); 

    // Local State tracking an Object for items selected in the form
    const [ formStepData, setFormStepData ] = useState<any>({}) // This object 

    const dispatch = useDispatch()

    // This variable represents how many optional form options were provided for a custom visualization (descriptor.formOptions)
    const vizFormOptionsCount = selectedViz?.formComponents?.length ?? 0;


    const handleVizSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.keys(formStepData).length > 0) {
            dispatch(updateViz(formStepData));
        }
        console.log("[FORM DATA]")
        console.log(formStepData)

        setFormStepData({});
        // Build using custom builder for your visualization
        const currentVizualization = store.getState().currentVizStore.currentVisualization
        const viz = selectedViz.builder(currentVizualization);
        console.log(viz)

        // ToDo dispatch viz to update vizStore.datasources and vizStore.layers
        // dispatch(addLayer(viz.layer))
        // for (const ds of viz.datasources){
        //     dispatch(addDataSource(ds))
        // }

        setShowForm(false);
    };



    const handleVizNext = (e:React.FormEvent)=>{
        e.preventDefault()
        // THIS ADDS DATA FOR EACH FORM OF A VISUALIZATION TO THE customVisualizationStore
        if (Object.keys(formStepData).length > 0) {
            dispatch(updateViz(formStepData));
        }
        setFormStepData({});
        setFormStep((prev)=>prev+1);

    }

    return (
        <form onSubmit={handleVizSubmit}>

            {/* STEP 0 — Visualization Selection */}
            {formStep === 0 && (
                <>
                <h6 className="text-muted mb-2">Select Visualization Type</h6>
                <div className="d-flex gap-2 flex-wrap">
                    {
                        visualizationRegistry.map(viz => (
                            <SelectOptionsComponent
                                key={viz.id}
                                vizDescriptor={viz}
                                selectedViz={selectedViz}
                                setSelectedViz={setSelectedViz}
                            />
                        ))
                    }
                </div>
                </>
            )}

            {/* STEP 1+ — Descriptor-driven steps for components in formSteps */}
            {formStep > 0 && selectedViz?.formComponents && (
                <>
                    <h6 className="text-muted mb-2">
                        {selectedViz.formComponents[formStep - 1].label}
                    </h6>

                    {React.createElement(
                        selectedViz.formComponents[formStep - 1].Component,
                        {
                            setFormStepData: setFormStepData
                        }
                    )}
                </>
            )}

            {/* Navigation */}
            <div className="d-flex justify-content-between mt-4">
                {/* Back Button*/}
                {formStep > 0 && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setFormStep(s => s - 1)}
                    >
                        Back
                    </button>
                )}

                 <div className="ms-auto">
                    {
                        selectedViz && formStep===vizFormOptionsCount ? 
                        <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={ handleVizSubmit }
                        >
                            Submit
                        </button>
                    :
                        <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={!selectedViz}
                        onClick={ handleVizNext }
                        >
                            Next
                        </button>
                    }                    
                </div>
            </div>
        </form>


    );
}
