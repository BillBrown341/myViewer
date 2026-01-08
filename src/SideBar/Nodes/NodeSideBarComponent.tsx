import React, { useState } from "react";
import { OshNode } from "../../dataTypes";
import SystemSideBarComponent from "./SystemSideBarComponent";
import { useDispatch } from "react-redux";
import { removeNode } from "../../Stores/nodeStore";
import { AppDispatch } from "../../Stores/storeRegistry";

export default function NodeSideBarComponent({ oshNode }: { oshNode: OshNode }) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // 🔴 critical
    dispatch(removeNode(oshNode));
  };

  return (
<div className="node-row">
  {/* Header row: delete + title */}
  <div className="node-header-row">
    <button
      className="node-delete-btn"
      onClick={handleRemove}
      title="Remove node"
    >
      ×
    </button>

    <li className="node-item">
      <div
        className="d-flex align-items-center justify-content-between node-title-row"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span>{oshNode.nodename}</span>
        <span>{expanded ? "▾" : "▸"}</span>
      </div>

      {/* Expanded content stays BELOW header */}
      {expanded && (
        <ul className="list-unstyled ms-3 mt-1">
          {oshNode.systems.map((sys) => (
            <SystemSideBarComponent
              key={sys.id}
              oshSystem={sys}
              oshDataStreams={oshNode.datastreams}
            />
          ))}
        </ul>
      )}
    </li>
  </div>
</div>

  );
}