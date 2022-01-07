import React from 'react';

const CardExampleCard = ({weatherData}) => {
  const iconNameToSizeMap = (prop) => {
    switch (prop) {
      case 'Clouds': return { width: 264, height: 166};
      case 'Clear': return { width: 208, height: 213};
      case 'Thunderstorm': return { width: 246, height: 187};
      case 'Snow': return { width: 230, height: 196};
      case 'Rain': return { width: 160, height: 222};
      case 'Drizzle': return { width: 160, height: 222};
      default: return {width: 230, height:209};
    }
  }

  const getWeather = (prop) => {
    switch (prop) {
      case 'Clouds': return 'cloudy';
      case 'Clear': return 'sunny';
      case 'Thunderstorm': return ' stormy';
      case 'Snow': return 'snowy';
      case 'Rain': return 'rainy';
      case 'Drizzle': return 'rainy';
      default: return 'partly-cloudy';
    }
  };

  const daysOfWeekMap = {
    0: 'SUN',  
    1: 'MON', 
    2: 'TUES', 
    3: 'WED', 
    4: 'THUR', 
    5: 'FRI', 
    6: 'SAT',
  }
  
  const fechita = new Date(weatherData.dt * 1000);
  const day = daysOfWeekMap[fechita.getDay()]
  const date = fechita.getDate()
  const mood = getWeather(weatherData.weather[0].main)
  const temperature = (weatherData.temp.day).toFixed(0)
  const humidity = weatherData.humidity
  const low = (weatherData.temp.min).toFixed(0)
  const widthHeight = iconNameToSizeMap(weatherData.weather[0].main)
  const width = widthHeight.width
  const height = widthHeight.height

  return (
    <div className="day">
      <div className="day-of-week">{day}</div>
      <div className="date">{date}</div>
      
      <div className={`bar ${mood}`}>

        <div className="weather">
          <svg role="img" >
            <use xlinkHref={`#${mood}`} width={width} height={height} viewBox={`0 0 ${width} ${height}`}></use>
          </svg>
        </div>

        <div className="temperature">
          {temperature}
          <span className="degrees">&deg;</span>
        </div>

        <div className="content">
          <div className="precipitation">
            <svg role="img" className="icon">
              <use xlinkHref={`#precipitation`}></use>
            </svg>
            {humidity}%
          </div>
          
          <div className="low">
            <svg role="img" className="icon">
              <use xlinkHref={`#low`}></use>
            </svg>
            {low}&deg;
          </div>
        </div>

      </div>
    </div>
)}

export default CardExampleCard;