import React, { useState } from "react";
import { visualizationRegistry } from "../../Visualizations/VisualizationRegistry";
import { VisualizationDescriptor } from "../../dataTypes";
import VisualizationSelectionOption from "./components/VisualizationSelectionOption";


export default function AddVisualizationForm({ closeModal }) {

    const [selectedViz, setSelectedViz] = useState<VisualizationDescriptor | null>(null);

    const handleSelectViz = (viz: VisualizationDescriptor) => { setSelectedViz(viz) };

    const handleVizSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        closeModal();
    };

    return (
        <form onSubmit={handleVizSubmit}>
        <div className="d-flex gap-2 flex-wrap">
            { visualizationRegistry.map(
                (vizDescriptor) => 
                    < VisualizationSelectionOption 
                        key={vizDescriptor.id} 
                        vizDescriptor={vizDescriptor}
                        selectedViz = {selectedViz}
                        setSelectedViz = { setSelectedViz } 
                    />
            )}
        </div>

        <div className="d-flex justify-content-end mt-3">
            <button
            className="btn btn-success"
            type="submit"
            disabled={!selectedViz}
            >
            Add Visualization
            </button>
        </div>
        </form>
    );
}
