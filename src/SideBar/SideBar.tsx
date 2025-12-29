import React, { useRef, useState } from "react";
import SideBarNodesSection from "./Nodes/SideBarNodesSection";
import SideBarVisualizationSection from "./Visualizations/SideBarVisualizationSection";

export default function SideBar() {
    // Create a draggable sidebar for user preference
    const [width, setWidth] = useState(250);
    const isDragging = useRef(false);

    const handleMouseDown = () => {
        isDragging.current = true;
        document.body.style.cursor = "col-resize";
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;

        const newWidth = e.clientX;
        const minWidth = 200;
        const maxWidth = 400;

        if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.cursor = "default";
    };

    React.useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <div className="d-flex">
            <div
                className="sidebar-container"
                style={{ width }}
            >
                <div className="p-3">
                <SideBarNodesSection />
                <SideBarVisualizationSection />
                </div>

                {/* Drag handle */}
                <div
                className="sidebar-resizer"
                onMouseDown={handleMouseDown}
                />
            </div>
        </div>
    );
}
