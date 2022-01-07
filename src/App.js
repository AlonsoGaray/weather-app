import React, { useEffect, useState } from "react";
import Weather from './components/Weather/Weather';
import Svg from './components/Svg/Svg';
import './App.css';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  const exclude = 'hourly, minutely, current, alerts'
  
  useEffect(() => {
    const fetchData = async () => {
      await navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (long !== null && lat !== null) {
        await fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result.daily)
        });
      }
    };
    fetchData();  
  }, [lat, long])

  return (
    <>
      <div className="wrapper">
        {data ? 
          data.map((d, i) => <Weather weatherData={d} key={i}/>)
          :
          null}        
      </div>
      <Svg />
    </>
  );
}

export default App;