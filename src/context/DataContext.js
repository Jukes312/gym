import { createContext, useState} from 'react';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [placeslibrary,setPlaceslibrary]=useState(null);
    const [gymResults,setGymResults]= useState(null);
    const [gmap,setGmap]= useState(null);
    const [isOpen,setIsopen] = useState(null)

    return (
        <DataContext.Provider value={{
            placeslibrary, setPlaceslibrary,
            gymResults,setGymResults,
            gmap, setGmap,
            isOpen,setIsopen
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;