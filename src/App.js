import React, { Component } from 'react';

import './App.css';
import "./components/HourDisplay.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Hourly from "./components/HourDisplay";

const Api_key = "bf557becf620e551472cdf1b91c2cb05";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

  //   this.weatherIcon = {
  //     Thunderstorm: "wi-thunderstorm",
  //     Drizzle: "wi-sleet",
  //     Rain: "wi-storm-showers",
  //     Snow: "wi-snow",
  //     Atmosphere: "wi-fog",
  //     Clear: "wi-day-sunny",
  //     Clouds: "wi-day-fog"
  // };
  }

//   get_WeatherIcon(icons, rangeId) {
//     switch (true) {
//         case rangeId >= 200 && rangeId < 232:
//             this.setState({ icon: icons.Thunderstorm });
//             break;
//         case rangeId >= 300 && rangeId <= 321:
//             this.setState({ icon: icons.Drizzle });
//             break;
//         case rangeId >= 500 && rangeId <= 521:
//             this.setState({ icon: icons.Rain });
//             break;
//         case rangeId >= 600 && rangeId <= 622:
//             this.setState({ icon: icons.Snow });
//             break;
//         case rangeId >= 701 && rangeId <= 781:
//             this.setState({ icon: icons.Atmosphere });
//             break;
//         case rangeId === 800:
//             this.setState({ icon: icons.Clear });
//             break;
//         case rangeId >= 801 && rangeId <= 804:
//             this.setState({ icon: icons.Clouds });
//             break;
//         default:
//             this.setState({ icon: icons.Clouds });
//     }
// }

  forecastItem = (item) => {
    this.setState({
      dateTime: item.dt,
      dateText: item.dt_txt,
      maxTemp: this.calculateCelsius(item.main.temp_max),
      minTemp: this.calculateCelsius(item.main.temp_min),
      temperature: this.calculateCelsius(item.main.temp),
      description: item.weather[0].description,
      mainDesc: item.weather[0].main
    });

    this.get_WeatherIcon(this.weatherIcon, item.weather[0].id);
  }

  getForecast = () => {

    const city = "Berlin";
    const countryCode = "us";

    (async () => {
      try {
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&APPID=${Api_key}&cnt=24`);

        const response = await api_call.json();

        this.setState({ data: response.list });

        //response.list.forEach(this.forecastItem);

        // this.setState({
        //   dateTime: response.dt,
        //   dateText: response.dt_txt,
        //   // maxTemp: this.calculateCelsius(response.list.main.temp_max),
        //   // minTemp: this.calculateCelsius(response.list.main.temp_min),
        //   // temperature: this.calculateCelsius(response.list.main.temp),
        //   // description: response.weather[0].description,
        //   // mainDesc: response.weather[0].main
        // });

        // this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

        console.log(response);
      }
      catch (err) {
        console.log("Can not fetch forecast right now", err);
      }
    })();
  }

  componentDidMount() {
    this.getForecast();
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <div className="container-fluid">
          <h3 className="pt-4">Weather Report</h3>
          <div className="card rounded-pill">
            <span className="text-center ty-col pt-4">Hourly</span>
            <div className="card-body text-dark align-self-center d-flex flex-wrap flex-row bd-highlight mb-3 justify-content-center">
              {data.map((item, i) => {
                return (
                  <Hourly 
                    dateText={item.dt_txt}
                    key={i}
                    icon={item.weather[0].id}
                    maxTemp={item.main.temp_max}
                    minTemp={item.main.temp_min}
                    temperature={item.main.temp}
                    description={item.weather[0].description}
                    //mainDesc={item.weather[0].main}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
