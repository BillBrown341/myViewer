import React, { useState } from "react";
import '../sidebar.css'
import AddVisualizationForm from "../../Forms/AddVisualizationForm/AddVisualizationForm";
import { useSelector } from "react-redux";
import { RootState } from "../../Stores/storeRegistry";
// import NodeSideBarComponent from "./NodeSideBarComponent";


export default function SideBarNodesSection(){
    const [showForm, setShowForm] = useState(false);
    // const allNodes = useSelector(
    //     (state:RootState)=>state.nodeStore.allNodes
    // )

    const handleAddNode = () => {
        setShowForm(true);
    }

    const handleCloseModal = () => {
        setShowForm(false);
    };



    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="text-uppercase text-muted mb-0">Visualizations</h6>
                <button 
                    className="sidebar-icon-btn"
                    onClick = {handleAddNode}
                >+</button>
            </div>
            {/* <ul className="list-unstyled mb-4">
                {allNodes.map((node)=>(
                    <NodeSideBarComponent key={node.id} oshNode={node} />                    
                ))}
                
            </ul> */}

            {/* Modal */}
            {showForm && (
                <div className="modal show fade d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Visualization</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <AddVisualizationForm closeModal={handleCloseModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal backdrop */}
            {showForm && <div className="modal-backdrop fade show"></div>}
        </>            
    )
}