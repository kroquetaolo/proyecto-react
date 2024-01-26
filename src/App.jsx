import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <>
      <NavBar/>
      <ItemListContainer greeting='Bienvenidos a Audiorack' message='ventas de racks para equipos de audio'/>
      <ItemListContainer greeting='Bienvenidos a Audiorack' message='ventas de racks para equipos de audio'/>
    </>
  );
}

export default App;
