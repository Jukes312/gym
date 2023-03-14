import { useContext } from 'react';
import DataContext from './context/DataContext';
import { FaLocationArrow} from 'react-icons/fa';
import usePlacesAutocomplete,{ getGeocode,getLatLng }from 'use-places-autocomplete';
import { Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';
import { useState,useEffect } from 'react';
import loadingimg from './loading anim.gif'
import EachGym from './EachGym';

const GymContent = () => {
    const {setGymResults, placeslibrary,gmap,gymResults,setOrigin,setObjloaction,objlocation} = useContext(DataContext);
    const [isLoading,setIsloading] = useState()

    const {
        value,
        setValue,
        suggestions:{
            data
        },
        clearSuggestions,
    } = usePlacesAutocomplete();


   

    useEffect(()=>{
        placeslibrary?.nearbySearch(objlocation, (results)=>{
            setGymResults(results)
          })
        gmap?.panTo(objlocation?.location)

        },[objlocation,placeslibrary]);


   

    

    const handleSelect = async(val)=>{
      setOrigin(val)
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
         
        navigator.geolocation.getCurrentPosition( async (postion)=>{
            setIsloading(false);
            const geocoder = new window.google.maps.Geocoder();
            const result = await geocoder.geocode({ location: {lat:postion.coords.latitude,lng:postion.coords.longitude}})
            setOrigin(await result.results[0].formatted_address)
       
            setObjloaction({
                location: {lat:postion.coords.latitude,lng:postion.coords.longitude},
                radius: 5000,
                type: ['gym']
              })

        })  
       }

  

 if(isLoading)return <img src={loadingimg} className='isloading'/>
  return (
    <div  className="Local-gym-block__content">
    <h1>FIND YOUR LOCAL GYM</h1>
    <Combobox onSelect={handleSelect}>
        <ComboboxInput 
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
    <button className="btn"  onClick={handleCurrentlocation}>
      <FaLocationArrow className='My-loctation-icon'/>
      USE MY LOCATION
    </button>
    <div className="gym-list">
        {gymResults?.map((value)=>
         <EachGym key={value.place_id} placeId={value.place_id}  name={value.name} rating={value.rating} address={value.vicinity}/>
        )}
    </div>
  </div>
  )
}

export default GymContent

