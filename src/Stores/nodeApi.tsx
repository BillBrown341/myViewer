import Systems from "osh-js/source/core/sweapi/system/Systems";
import DataStreams from "osh-js/source/core/sweapi/datastream/DataStreams";
import { OshDataStream, OshNetworkProperties, OshSystem } from "../dataTypes"; 


// PRIMARY API CALLS
export const fetchSystems = async (
  networkProperties: OshNetworkProperties
): Promise<OshSystem[]> => {
    const oshJsSystems = new Systems(networkProperties);
    const systems = await parseCollection(await oshJsSystems.searchSystems())

    const oshSystems:OshSystem[] = systems.map((sys)=>{
        return ({
            networkProperties:networkProperties,
            type:sys.properties.type,
            id:sys.properties.id,
            uid: sys.properties.properties.uid,
            featureType:sys.properties.properties.featureType,
            name:sys.properties.properties.name
        })
    })

    return oshSystems
}
  

export const fetchDataStreams = async (
  networkProperties: OshNetworkProperties
): Promise<OshDataStream[]> => {
    const oshJsDatastreams = new DataStreams(networkProperties);
    const datastreams = await parseCollection(await oshJsDatastreams.searchDataStreams())
    debugger
    const oshDataStreams:OshDataStream[] = await Promise.all(datastreams.map(async (ds)=>{
        
        return ({
            networkProperties:networkProperties,
            id:ds.properties.id,
            name:ds.properties.name,
            outputName:ds.properties.outputName,
            system:{
                id:ds.properties['system@id'],
                href:ds.properties['system@link'].href,
                uid:ds.properties['system@link'].uid
            },
            schema: await ds.getSchema()
        })
    }))

    return oshDataStreams
};


// HELPER METHODS
const parseCollection = async (collection:any) => {
    const collectionArray = []
    try{
        while(collection.hasNext()){
                const page = await collection.nextPage();
                collectionArray.push(...page);        
        }
    }catch (err){
        console.warn("Optional collection not available:", err);
        return null
    }

    return collectionArray
}


