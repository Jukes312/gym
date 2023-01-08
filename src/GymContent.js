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
    const {setGymResults, placeslibrary,gmap,gymResults} = useContext(DataContext);
    const [isLoading,setIsloading] = useState()

    const {
        value,
        setValue,
        suggestions:{
            data
        },
        clearSuggestions,
    } = usePlacesAutocomplete();


    /**Request object for the google maps places library api call parameter*/
    const[objlocation,setObjloaction] = useState({
        location: {lat:51.50853, lng:-0.12574},
        radius: 5000,
        type: ['gym']
    })

    useEffect(()=>{
        placeslibrary?.nearbySearch(objlocation, (results)=>{
            setGymResults(results)
          })
        gmap?.panTo(objlocation?.location)

        },[objlocation,placeslibrary]);


   

    

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
         <EachGym key={value.place_id} placeId={value.place_id}  name={value.name} rating={value.rating}/>
        )}
    </div>
  </div>
  )
}

export default GymContent

