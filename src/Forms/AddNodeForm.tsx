import React, { useState } from "react";
import { addNode } from "../Stores/nodeStore";
import { useDispatch } from "react-redux";
import { OshNetworkProperties } from "../dataTypes";
import { AppDispatch } from "../Stores/storeRegistry";
import { fetchDataStreams, fetchSystems } from "../Stores/nodeApi";
import { randomUUID } from 'osh-js/source/core/utils/Utils.js';




export default function AddNodeForm({ closeModal }){
    const dispatch = useDispatch<AppDispatch>(); // Dispatch is used by Redux to store the state of the node info
    

    const [nodeInfo, setNodeInfo] = useState({
        nodename:"My Node",
        hostname:"localhost",
        port:"8080",
        resource:"sensorhub/api",
        protocol:"ws",
        username:"admin",
        password:"admin"
    });


    const handleFormUpdates = (e: any) => {
        const {id, value} = e.target; // destructure form the event
        setNodeInfo((prev)=> ({
            ...prev,
            [id]:value,
        }))
    }    

    const handleNodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Keep form from reloading

        // Reformat Node Info from the form to Network Properties in the way OSH-JS requires
        const networkProperties: OshNetworkProperties = {
            endpointUrl: `${nodeInfo.hostname}:${nodeInfo.port}/${nodeInfo.resource}`,
            streamProtocol: nodeInfo.protocol,
            tls:false,
            connectorOpts: {
                username: nodeInfo.username,
                password: nodeInfo.password,
            },
        };

        //USE THE NODE API TO FETCH SYSTEMS AND DATASTREAMS
        const nodeSystems = await fetchSystems(networkProperties);
        const nodeDataStreams = await fetchDataStreams(networkProperties);       

        // USE REDUX TO CREATE A NODE OBJECT WITH SYSTEMS AND DATASTREAM INFO IN THE NODE STORE
        dispatch(addNode(
            {
                id:`node-${randomUUID()}`,
                nodename:nodeInfo.nodename,
                networkProperties:networkProperties,
                systems: nodeSystems,
                datastreams: nodeDataStreams
            }
        ));

        closeModal();

    };

    return (

                                    
        <form>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="nodename" value={nodeInfo.nodename} onChange={handleFormUpdates}/>
                <label htmlFor="nodename">Node Name:</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="hostname" value={nodeInfo.hostname} onChange={handleFormUpdates}/>
                <label htmlFor="hostname">Hostname:</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="port" value={nodeInfo.port} onChange={handleFormUpdates}/>
                <label htmlFor="resource">Port:</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="resource" value={nodeInfo.resource} onChange={handleFormUpdates}/>
                <label htmlFor="resource">Resource:</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="protocol" value={nodeInfo.protocol} onChange={handleFormUpdates}/>
                <label htmlFor="protocol">Protocol:</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="username" value={nodeInfo.username} onChange={handleFormUpdates}/>
                <label htmlFor="username">Username:</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" value={nodeInfo.password} onChange={handleFormUpdates}/>
                <label htmlFor="password">Password:</label>
            </div>

                <div className="d-flex justify-content-end mt-3">
                <button 
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleNodeSubmit}
                >
                Submit
                </button>
            </div>
        </form>
        
    )
}