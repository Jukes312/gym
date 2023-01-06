import {GoogleMap,MarkerF,InfoWindowF} from '@react-google-maps/api';
import { useContext,useState } from 'react';
import DataContext from './context/DataContext';
import gymIcon from './fitness.png'
const center = {lat:51.50853, lng:-0.12574}

const Map = () => {
    const {setPlaceslibrary,placeslibrary, gymResults,setGmap,isOpen,setIsopen} = useContext(DataContext);
    const [selectedMarker,setSelectedMarker] = useState(null);
   
    

    const OnMapLoad = (mappp) => {
        setPlaceslibrary(new window.google.maps.places.PlacesService(mappp));
        setGmap(mappp)
    };

  return (
    <GoogleMap id="map" center={center} zoom={13} onLoad={(mappp) => OnMapLoad(mappp) }  >
       {gymResults?.map((obj)=> <MarkerF position={obj.geometry.location} key={obj.place_id} icon={{url:gymIcon}} onClick={()=> {setSelectedMarker(obj)
      placeslibrary.getDetails({
        placeId: obj.place_id,
        fields: ['opening_hours','utc_offset_minutes']
      },(places)=>{
                   const isOpenNow= places?.opening_hours?.isOpen()
                    if(isOpenNow) setIsopen(true) 
                    else if(isOpenNow===undefined) setIsopen(false)
                    else setIsopen(false)
                    
                  })}}/>)}
       {selectedMarker?(
        <InfoWindowF position={selectedMarker.geometry.location} onCloseClick={()=>{setSelectedMarker(null)
        setIsopen(null)}}>
          <div>
            <h1>Name:</h1>
            <p>{selectedMarker.name}</p>
            <h1>Open:</h1>
            <p className={isOpen?'open':'closed'}>{isOpen?'open':'Not open'}</p>
            
          </div>
        </InfoWindowF>
       ):null}
    </GoogleMap>
  )
}

export default Map