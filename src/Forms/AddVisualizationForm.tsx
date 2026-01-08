import React, { useState } from "react";
import { visualizationRegistry } from "../Visualizations/VisualizationRegistry";
import { VisualizationDescriptor } from "../dataTypes";
import SelectOptionsComponent from "./Components/SelectOptionsComponent";
import { useDispatch } from "react-redux";
import { updateViz } from "../Stores/currentVizStore";


export default function AddVisualizationForm({ setShowForm }) {

    const [selectedViz, setSelectedViz] = useState<VisualizationDescriptor | null>(null);

    const [ formStep , setFormStep ] = useState(0);

    const dispatch = useDispatch()

    // This variable represents how many optional form options were provided for a custom visualization (descriptor.formOptions)
    const vizFormOptionsCount = selectedViz?.formOptions?.length ?? 0;


    const handleVizSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ToDo: Create a Visualization Store and add a visualization to it

        setShowForm(false);
    };



    const handleVizNext = (e:React.FormEvent)=>{
        e.preventDefault()
        setFormStep((prev)=>prev+1)

    }

    return (
        <form onSubmit={handleVizSubmit}>

            {/* STEP 0 — Visualization Selection */}
            {formStep === 0 && (
                <>
                <h6 className="text-muted mb-2">Select Visualization Type</h6>
                <div className="d-flex gap-2 flex-wrap">
                    {visualizationRegistry.map(viz => (
                    <SelectOptionsComponent
                        key={viz.id}
                        vizDescriptor={viz}
                        selectedViz={selectedViz}
                        setSelectedViz={setSelectedViz}
                    />
                    ))}
                </div>
                </>
            )}

            {/* STEP 1+ — Descriptor-driven steps for components in formSteps */}
            {formStep > 0 && selectedViz?.formOptions && (
                <>
                    <h6 className="text-muted mb-2">
                        {selectedViz.formOptions[formStep - 1].label}
                    </h6>

                    {React.createElement(
                        selectedViz.formOptions[formStep - 1].Component,
                        {
                            onCommitViz: (partial) => {
                                dispatch(updateViz(partial))
                            }
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
