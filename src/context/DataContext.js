import { createContext, useState,useRef} from 'react';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [placeslibrary,setPlaceslibrary]=useState(null);
    const [gymResults,setGymResults]= useState(null);
    const [gmap,setGmap]= useState(null);
    const [isOpen,setIsopen] = useState(null)
    const myRef = useRef([])

    

    return (
        <DataContext.Provider value={{
            placeslibrary, setPlaceslibrary,
            gymResults,setGymResults,
            gmap, setGmap,
            isOpen,setIsopen,
            myRef
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;