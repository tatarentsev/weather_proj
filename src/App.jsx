import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div style={{display: "flex", gap: "30px", justifyContent: "center"}}>
      <Weather />
      {/* <Weather cityName={'krasnodar'}/> */}
      {/* <Weather cityName={'volgograd'}/> */}
    </div>
  );
}

export default App;
