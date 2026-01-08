/*
 * Copyright (c) 2024.  Botts Innovative Research, Inc.
 * All Rights Reserved
 *
 * opensensorhub/osh-viewer is licensed under the
 *
 * Mozilla Public License 2.0
 * Permissions of this weak copyleft license are conditioned on making available source code of licensed
 * files and modifications of those files under the same license (or in certain cases, one of the GNU licenses).
 * Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.
 * However, a larger work using the licensed work may be distributed under different terms and without
 * source code for files added in the larger work.
 *
 */

import './App.css'
import React, { useState } from "react";
import SideBar from './SideBar/SideBar';
import LeafletMap from './Maps/LeafletMap';
import { useSelector } from 'react-redux';
import { RootState } from './Stores/storeRegistry';
import AddVisualizationForm from './Forms/AddVisualizationForm';
import { clear } from './Stores/currentVizStore';
import { useDispatch } from 'react-redux';

export default function App() {

    const selectedDataStreams = useSelector(
            (state:RootState)=>state.currentVizStore.selectedDataStreams
    );

    const showAddVisualiztionControls = selectedDataStreams.length > 0;
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);

    
    return (
        <div className="app-container">
            <SideBar />
            <LeafletMap />
            <div className={`viz-controls ${showAddVisualiztionControls ? "visible" : ""}`}>
                <button onClick={()=>setShowForm(true)}>Add Visualization</button>
                <button onClick={()=>dispatch(clear())}>Clear Selection</button>
            </div>
            
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
                                    onClick={()=>setShowForm(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <AddVisualizationForm setShowForm={setShowForm} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal backdrop */}
            {showForm && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};