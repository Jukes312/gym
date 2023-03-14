import {DirectionsRenderer, GoogleMap} from '@react-google-maps/api';
import { useContext} from 'react';
import DataContext from './context/DataContext';
import gymIcon from './fitness.png'
import Marker from './Marker';
import {MarkerF} from '@react-google-maps/api';
const center = {lat:51.50853, lng:-0.12574}

const Map = () => {
    const {setPlaceslibrary, gymResults,setGmap,directionResponse,objlocation} = useContext(DataContext);

   const OnMapLoad = (map) => {
        setPlaceslibrary(new window.google.maps.places.PlacesService(map));
        setGmap(map)
    };

  
   
  
  return (
    <GoogleMap id="map" center={objlocation.location} zoom={13} onLoad={(map) => OnMapLoad(map) }  >
       {gymResults?.map((obj)=> <Marker gym={obj} markPosition={obj.geometry.location} markKey={obj.place_id} key={obj.place_id} markIcon={{url:gymIcon}}/>)}
       {directionResponse&&<DirectionsRenderer directions={directionResponse} options={{
        suppressMarkers: true
       }} />}
       <MarkerF position={objlocation.location} />
    </GoogleMap>
  )
}

export default Map