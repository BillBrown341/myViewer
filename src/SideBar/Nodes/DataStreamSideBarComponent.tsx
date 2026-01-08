import React from "react";
import { OshDataStream } from "../../dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Stores/storeRegistry";
import { addDataStream, removeDataStream } from "../../Stores/currentVizStore";


export default function DataStreamComponent({ oshDataStream }: { oshDataStream: OshDataStream }){
    const dispatch = useDispatch();

    const selectedDataStreams = useSelector(
        (state:RootState)=>state.currentVizStore.selectedDataStreams
    );

    const isChecked = selectedDataStreams.some(
        (ds) => ds.id === oshDataStream.id
    );


    
    const onToggle = (checked: boolean) => {
        
        if (checked) {
            dispatch(
                addDataStream(oshDataStream)
            );
        } else {
            dispatch(removeDataStream(oshDataStream));
        }
    };
    


    return (
        <li>
            <div
                className="d-flex align-items-center justify-content-between"
            >
                <span>{oshDataStream.outputName}</span>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onToggle(e.target.checked)}
                />
            </div>
        </li>
    )
}
