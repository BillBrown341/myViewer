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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cartesian3, Ion, SceneMode, Terrain, } from "@cesium/engine";
import "@cesium/engine/Source/Widget/CesiumWidget.css";
import CesiumView from "osh-js/source/core/ui/view/map/CesiumView.js";
import DataSynchronizer from 'osh-js/source/core/timesync/DataSynchronizer';
import { Mode } from "osh-js/source/core/datasource/Mode";
import PointMarkerLayer from "osh-js/source/core/ui/layer/PointMarkerLayer";
import PolygonLayer from "osh-js/source/core/ui/layer/PolygonLayer";
import SweApi from "osh-js/source/core/datasource/sweapi/SweApi.datasource";
import VideoDataLayer from "osh-js/source/core/ui/layer/VideoDataLayer";
import DataLayer from "osh-js/source/core/ui/layer/DataLayer";
import VideoView from "osh-js/source/core/ui/view/video/VideoView";
import Systems from "osh-js/source/core/sweapi/system/Systems.js";
import DataStreams from "osh-js/source/core/sweapi/datastream/DataStreams.js"
import DataStream from "osh-js/source/core/sweapi/datastream/DataStream.js"
import ObservationFilter from "osh-js/source/core/sweapi/observation/ObservationFilter.js"
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SideBar from './SideBar/SideBar';


export default function App() {
    // let [mySystems, setMySystems] = useState([]);
    // let [myDatastream, setMyDataStreams] = useState([]);


    // const networkProperties = {
    //     endpointUrl: "localhost:8080/sensorhub/api",
    //     tls: false,
    //     streamProtocol: 'ws', // or mqtt
    //     connectorOpts: {
    //         username: 'admin',
    //         password: 'admin',
    //     }
    // }

    // const systems = new Systems(networkProperties);

    // async function getDataStreams() {
    //     const datastreams = new DataStreams(networkProperties)
    //         try {
    //             const collection = await datastreams.searchDataStreams()
    //             const allDataStreams = [];
    //             while(collection.hasNext()){
    //                 const page = await collection.nextPage();
    //                 allDataStreams.push(...page);
    //             }

    //             return allDataStreams;
    //         } catch (err) {
    //             console.error("failed", err)
    //             return [];
    //         }
            
    //     }
    

    // useEffect(()=>{
    //     async function load() {
    //         const datastreams = await getDataStreams();
    //         setMyDataStreams(datastreams);
    //     }

    //     load()
    // },[])

    // console.log(myDatastream)

    return (
        <>
            <SideBar />
        </>
    );
};