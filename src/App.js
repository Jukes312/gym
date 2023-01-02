import GymContent from './GymContent';
import { useLoadScript} from '@react-google-maps/api';
import Map from './Map';
import { useState} from 'react';

const libraries = ['places']

function App() {
  /**Loading the google maps api script*/
 const {isLoaded} = useLoadScript({
 googleMapsApiKey: 'AIzaSyCk9PE2WKja1eVqUKrbGWepg2Gh1adzsEM',
 libraries,
 });

 const [places,setPlaces]=useState(null);
 const [postionn,setPostionn]= useState(null);
 const [gmap,setGmap]= useState(null);
 
 





   
   if(!isLoaded)return <div>Loading</div>;
     return (
    <div className="App">
       <section className="Local-gym-block grid grid--1x2">
     <GymContent  setPostionn={setPostionn} places={places} gmap={gmap} postionn={postionn}/>
     <Map setPlaces={setPlaces} postionn={postionn}  setGmap={setGmap} />
    </section>
    </div>
  );
}

export default App;
