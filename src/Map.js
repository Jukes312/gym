import {GoogleMap,MarkerF} from '@react-google-maps/api';

import gymIcon from './fitness.png'

const center = {lat:51.50853, lng:-0.12574}

const Map = ({setPlaces,postionn,setGmap}) => {
    let mapp;

    const OnMapLoad = (mappp) => {
        mapp = new window.google.maps.places.PlacesService(mappp)
        setPlaces(mapp);
        setGmap(mappp)
       
      
    };




  return (
    <GoogleMap id="map" center={center} zoom={10} onLoad={(mappp) => OnMapLoad(mappp) }  >
       {postionn?.map((obj)=> <MarkerF position={obj.geometry.location} key={obj.place_id} icon={{url:gymIcon}}/>)}
    </GoogleMap>
  )
}

export default Map