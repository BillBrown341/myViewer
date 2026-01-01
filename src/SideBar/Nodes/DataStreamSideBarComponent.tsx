import React from "react";
import { OshDataStream } from "../../dataTypes";


export default function DataStreamComponent({ oshDataStream }: { oshDataStream: OshDataStream }){


    return (
        <li>
            <div
                className="d-flex align-items-center justify-content-between"
            >
                <span>{oshDataStream.outputName}</span>
            </div>
        </li>
    )
}
