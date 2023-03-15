import React from "react";
import { InfoWindowF } from "@react-google-maps/api";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const InfoWindow = ({ selectedMarker, setSelectedMarker }) => {
  const { setIsopen, isOpen } = useContext(DataContext);
  return (
    <>
      {selectedMarker ? (
        <InfoWindowF
          position={selectedMarker.location}
          onCloseClick={() => {
            setSelectedMarker(null);
            setIsopen(null);
          }}
        >
          <div>
            <h1>Name:</h1>
            <p>{selectedMarker.name}</p>
            <h1>Open:</h1>
            <p className={selectedMarker.open ? "open" : "closed"}>
              {selectedMarker.open ? "Open" : "Closed"}
            </p>
          </div>
        </InfoWindowF>
      ) : null}
    </>
  );
};

export default InfoWindow;
