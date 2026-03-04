import React, { useEffect, useMemo, useRef } from "react";
import LeafletView from "osh-js/source/core/ui/view/map/LeafletView.js";
import PointMarkerLayer from "osh-js/source/core/ui/layer/PointMarkerLayer.js";
import SweApi from "osh-js/source/core/datasource/sweapi/SweApi.datasource";
import { Mode } from "osh-js/source/core/datasource/Mode";
import "./map.css";
import { useSelector } from "react-redux";
import { RootState } from "../Stores/storeRegistry";

export default function LeafletMap() {
    const mapRef = useRef<any>(null);


    const dataSources = useSelector(
                (state:RootState)=>state.vizStore.dataSources
        );

    const layers = useSelector(
                (state:RootState)=>state.vizStore.layers
        );


    useEffect(() => {
        mapRef.current = new LeafletView({
            container: "map-container",
            // layers: [pointMarkerLayer],
            layers: layers,
            autoZoomOnFirstMarker: true
        });
    }, [layers]);

    useEffect(() => {
        for (const ds of dataSources){
            ds.connect()
        }        
    }, [dataSources]);

    return (
        <div className="map-root">
            <div id="map-container" />
        </div>
    );
}
