import GymContent from './GymContent';
import { useLoadScript} from '@react-google-maps/api';
import Map from './Map';
import { DataProvider } from './context/DataContext';

const libraries = ['places']

function App() {
  /**Loading the google maps api script*/
 const {isLoaded} = useLoadScript({
  googleMapsApiKey: 'AIzaSyCk9PE2WKja1eVqUKrbGWepg2Gh1adzsEM',
  libraries,
 });

   if(!isLoaded)return <div>Loading</div>;
     return (
    <div className="App">
      <section className="Local-gym-block grid grid--1x2">
        <DataProvider>
        <GymContent/>
        <Map />
        </DataProvider>
      </section>
    </div>
  );
}

export default App;
