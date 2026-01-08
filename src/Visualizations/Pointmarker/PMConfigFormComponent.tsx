import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Stores/storeRegistry";

export default function PMConfigFormComponent({onCommitViz}) {
  const selectedDataStreams = useSelector(
    (state: RootState) => state.currentVizStore.selectedDataStreams
  );

  const [useLocation, setUseLocation] = useState(false);
  const [selectedLocationDSId, setSelectedLocationDSId] = useState("");
  const [selectedLocationField, setSelectedLocationField] = useState("");

  const selectedLocationDS = selectedDataStreams.find(
    ds => ds.id === selectedLocationDSId
  );

    React.useEffect(() => {
    if (!useLocation) {
      onCommitViz({ layerOpts: { location: null } });
      return;
    }

    if (selectedLocationDS && selectedLocationField) {
      onCommitViz({
        layerOpts: {
          location: {
            locationDS: selectedLocationDS,
            locationProp: selectedLocationField
          }
        }
      });
    }
  }, [useLocation, selectedLocationDS, selectedLocationField]);

  
  
  return (
    <div>
      {/* Location checkbox */}
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="useLocation"
          checked={useLocation}
          onChange={e => {
            setUseLocation(e.target.checked);
            if (!e.target.checked) {
              setSelectedLocationDSId("");
            }
          }}
        />
        <label className="form-check-label" htmlFor="useLocation">
          Location
        </label>
      </div>

      {/* Conditional UI */}
      {useLocation && (
        <>
          {/* Datastream selection */}
          <label className="form-label">Select Datastream</label>
          <select
            className="form-select mb-3"
            value={selectedLocationDSId}
            onChange={e => setSelectedLocationDSId(e.target.value)}
          >
            <option value="">-- Select --</option>
            {selectedDataStreams.map(ds => (
              <option key={ds.id} value={ds.id}>
                {ds.name}
              </option>
            ))}
          </select>

          {/* Schema selection */}
          {selectedLocationDS?.schema && (
            <>
              <label className="form-label">Select Property</label>
              <select 
                className="form-select"
                value={selectedLocationField}
                onChange={e => setSelectedLocationField(e.target.value)}
              >
                <option value="">-- Select --</option>
                {(selectedLocationDS.schema.resultSchema.fields).map(prop => (
                  <option key={prop.name} value={prop.name}>
                    {prop.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </>
      )}
    </div>
  );
}
