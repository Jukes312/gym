

import { FaLocationArrow} from 'react-icons/fa';
import usePlacesAutocomplete,{ getGeocode,getLatLng }from 'use-places-autocomplete';
import { Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';

import { useState,useEffect } from 'react';

import { AiOutlineLoading3Quarters} from 'react-icons/ai';





const GymContent = ({places,setPostionn,gmap,postionn}) => {
    

    const {
        value,
        setValue,
        suggestions:{
            data
        },
        clearSuggestions,
    } = usePlacesAutocomplete();
    
    const[objlocation,setObjloaction] = useState({
        location: {lat:51.50853, lng:-0.12574},
        radius: 5000,
        type: ['gym']
    })

    useEffect(()=>{
        places?.nearbySearch(objlocation, (results)=>{
            setPostionn(results)
          })
        gmap?.panTo(objlocation?.location)
        
         

        },[objlocation.location]);


   
    const [isLoading,setIsloading] = useState()
   

    const handleSelect = async(val)=>{
      setValue(val,false);
      clearSuggestions();

      const results = await getGeocode({address:val})
      const {lat,lng} = await getLatLng(results[0]);
      setObjloaction({
        location: {lat,lng},
        radius: 5000,
        type: ['gym']
      })
    
    }

    const handleCurrentlocation=()=>{
        setIsloading(true)
        navigator.geolocation.getCurrentPosition( (postion)=>{
            setIsloading(false);
            setObjloaction({
                location: {lat:postion.coords.latitude,lng:postion.coords.longitude},
                radius: 5000,
                type: ['gym']
              })
            
        })
          
       }

    
    


 if(isLoading)return <AiOutlineLoading3Quarters className='isloading'/>
  return (
    <div  className="Local-gym-block__content">
    <h1>FIND YOUR LOCAL GYM</h1>
    <Combobox onSelect={handleSelect}>
        <ComboboxInput id="address"
        className="input input-group-input"
        placeholder="Search address or city..."
        value={value}
        onChange= {(e)=>setValue(e.target.value)}/>

    <ComboboxPopover className='input'>
        <ComboboxList className='input-results'>
            {data.map(({place_id,description})=><ComboboxOption className='input-results-result' key={place_id} value={description}/>)}
        </ComboboxList>
    </ComboboxPopover>
    </Combobox>
    <p>Or</p>
    <button className="btn" id="myLocation" onClick={handleCurrentlocation}>
      <FaLocationArrow className='My-loctation-icon'/>
      USE MY LOCATION
    </button>
    <div className="gym-list" id="gyms-info">
        {postionn?.map((value)=>
        <section className="gym-list__content">
        <h1 className='gym-list__heading '>NAME:</h1>
        <p className="gym-list__name">{value.name}</p>
        <h1 className='gym-list__heading'>RATING:</h1>
        <p className="gym-list__rating">{value.rating}</p>
        </section>
        )}
    </div>
  </div>
  )
}

export default GymContent

