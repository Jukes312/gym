import React from 'react'
import {MarkerF} from '@react-google-maps/api';
import { useState,useContext } from 'react';
import DataContext from './context/DataContext';
import InfoWindow from './InfoWindow';

const Marker = ({ markPosition,markKey, markIcon,gym}) => {
    const {placeslibrary,setIsopen,myRef} = useContext(DataContext);
    const [selectedMarker,setSelectedMarker] = useState(null);

    const handleScroll = (gym)=>{ 
        myRef.current.filter((val)=>val.id===gym.place_id)[0].scrollIntoView({behavior: "smooth",block: "center", inline: "center"})
       }
    const handleMarkerinfo=(gym)=>{
        /**Api call made to check if gym is open or closed*/
       placeslibrary.getDetails({
         placeId: gym.place_id,
         fields: ['opening_hours','utc_offset_minutes']
       },(places)=>{
                    const isOpenNow= places?.opening_hours?.isOpen()
                     if(isOpenNow)  setSelectedMarker({name:gym.name,open:true,location:gym.geometry.location})
                     else if(isOpenNow===undefined) setSelectedMarker({name:gym.name,open:false,location:gym.geometry.location})
                     else setSelectedMarker({name:gym.name,open:false,location:gym.geometry.location})
                   })
       
       handleScroll(gym);
      }
   
  return (
    <>
    <MarkerF position={markPosition} key={markKey} icon={markIcon} onClick={()=> {handleMarkerinfo(gym)}}/>
    <InfoWindow selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker}/>
    </>
  )
}

export default Marker