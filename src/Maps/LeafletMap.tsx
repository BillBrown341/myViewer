import React, { useEffect, useMemo, useRef } from "react";
import LeafletView from "osh-js/source/core/ui/view/map/LeafletView.js";
import PointMarkerLayer from "osh-js/source/core/ui/layer/PointMarkerLayer.js";
import SweApi from "osh-js/source/core/datasource/sweapi/SweApi.datasource";
import { Mode } from "osh-js/source/core/datasource/Mode";
import "./map.css";

export default function LeafletMap() {
    const mapRef = useRef<any>(null);
    const server = "localhost:8080/sensorhub/api";
    const datastreamId = "022d7d6grchg";

    

    // 1️⃣ Data source (MATCHES Cesium pattern)
    const locationDataSource = useMemo(() => new SweApi("Test-Location", {
        protocol: "ws",
        endpointUrl: server,
        resource: `/datastreams/${datastreamId}/observations`,
        mode: Mode.REAL_TIME
    }), []);

    // 2️⃣ Point marker layer (MATCHES Cesium pattern)
    const pointMarkerLayer = useMemo(() => new PointMarkerLayer({
        getLocation: {
            dataSourceIds: [locationDataSource.getId()],
            handler: (rec: any) => ({
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt ?? 0
            })
        },
        name: "Test Marker",
        label: "Test"
    }), [locationDataSource]);

    useEffect(() => {
        mapRef.current = new LeafletView({
            container: "map-container",
            layers: [pointMarkerLayer],
            autoZoomOnFirstMarker: true
        });
    }, [pointMarkerLayer]);

    useEffect(() => {
        locationDataSource.connect();
    }, []);

    return (
        <div className="map-root">
            <div id="map-container" />
        </div>
    );
}
