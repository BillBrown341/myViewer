import { useSelector } from "react-redux";
import { RootState } from "../../Stores/storeRegistry";
import PointMarkerLayer from "osh-js/source/core/ui/layer/PointMarkerLayer.js";
import SweApi from "osh-js/source/core/datasource/sweapi/SweApi.datasource";
import { Mode } from "osh-js/source/core/datasource/Mode";


const PointMarkerBuilder = (currentVisualization) => {
    const sweDataSources = []


    for (const vizDs of currentVisualization.datastreams){                
        const dataSource = new SweApi(vizDs.id, {
            protocol: "ws",
            endpointUrl:vizDs.networkProperties.endpointUrl,
            resource: `/datastreams/${vizDs.id}/observations`, 
            mode: Mode.REAL_TIME
        })

        sweDataSources.push(dataSource)
    }

    const pmObject = {}

    if(currentVisualization.location){
        pmObject.getLocation = {
            dataSourceIds: sweDataSources.filter((ds)=>{
                if(ds.name === currentVisualization.location.ds.id)
                return ds.getId()
            }),
            handler: (rec: any) => ({
                x: rec[currentVisualization.location.prop].lon,
                y: rec[currentVisualization.location.prop].lat,
                z: rec[currentVisualization.location.prop].alt ?? 0
            })
        }
    }

    

    pmObject.name = "test marker";
    pmObject.label = "test"

    console.log("[POINT MARKER OBJECT IN BUILDER]:")
    console.log(pmObject)
    
    const pointMarkerLayer =  new PointMarkerLayer(pmObject)


    return {
            layer: pointMarkerLayer,
            datasources: sweDataSources
    }
}

export default PointMarkerBuilder;