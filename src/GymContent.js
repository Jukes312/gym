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


const GymContent = () => {
    const {setGymResults, placeslibrary,gmap,gymResults,isOpen} = useContext(DataContext);
    const [isLoading,setIsloading] = useState()
    const [isOpenlist,setIsopenlist] = useState([])

    const {
        value,
        setValue,
        suggestions:{
            data
        },
        clearSuggestions,
    } = usePlacesAutocomplete();


     /**Request object for the google maps places library api call*/
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

        },[objlocation,placeslibrary,gmap]);


        useEffect(()=>{
        if(gymResults)
        for (const element of gymResults) {
          placeslibrary.getDetails({
            placeId: element.place_id,
            fields: ['opening_hours','utc_offset_minutes']
          },(places)=>{
                       const isOpenNow= places?.opening_hours?.isOpen()
                        if(isOpenNow) setIsopenlist([...isOpenlist,isOpenlist.push(true)])
                        else if(isOpenNow===undefined) setIsopenlist([...isOpenlist,isOpenlist.push(false)])
                        else setIsopenlist([...isOpenlist,isOpenlist.push(false)])
                        
                      })
        }
        },[gymResults])

    

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
        <section key={value.place_id} className="gym-list__content">
        <h1 className='gym-list__heading '>NAME:</h1>
        <p className="gym-list__name">{value.name}</p>
        <h1 className='gym-list__heading'>RATING:</h1>
        <p className="gym-list__rating">{value.rating||'Not rated'}</p>
        </section>
        )}
    </div>
  </div>
  )
}

export default GymContent

