import React, { useState } from "react";
import { OshDataStream, OshSystem } from "../../dataTypes";
import DataStreamCard from "./DataStreamCard";


export default function SystemCard({ oshSystem, oshDataStreams }: { oshSystem: OshSystem, oshDataStreams:OshDataStream[] }){
    const [expanded, setExpanded] = useState(false);

    // Find all datastreams for the specific system
    const sysDataStreams = oshDataStreams.filter((ds)=>{
        return ds.system.id === oshSystem.id
    })

    

    return (
        <li>
          <div
            className="d-flex align-items-center justify-content-between"
            onClick={() => setExpanded((prev) => !prev)}
          >
            <span>{oshSystem.name}</span>
            <span>{expanded ? "▾" : "▸"}</span>
          </div>

          {expanded && (
            <ul className="list-unstyled ms-3 mt-1">
                {sysDataStreams.map((ds)=>(
                    <DataStreamCard key={ds.id} oshDataStream={ds} />                    
                ))}
            </ul>
          )}
        </li>
    )
}
