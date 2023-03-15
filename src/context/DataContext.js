import { createContext, useState, useRef } from "react";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [placeslibrary, setPlaceslibrary] = useState(null);
  const [gymResults, setGymResults] = useState(null);
  const [gmap, setGmap] = useState(null);
  const [isOpen, setIsopen] = useState(null);
  const [origin, setOrigin] = useState("London,uk");
  const [directionResponse, setDirectionRespose] = useState(null);
  /**Request object for the google maps places library api call parameter*/
  const [objlocation, setObjloaction] = useState({
    location: { lat: 51.5073359, lng: -0.12765 },
    radius: 5000,
    type: ["gym"],
  });
  const myRef = useRef([]);

  return (
    <DataContext.Provider
      value={{
        placeslibrary,
        setPlaceslibrary,
        gymResults,
        setGymResults,
        gmap,
        setGmap,
        isOpen,
        setIsopen,
        myRef,
        origin,
        setOrigin,
        directionResponse,
        setDirectionRespose,
        objlocation,
        setObjloaction,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
