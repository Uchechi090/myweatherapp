import React, { Component } from "react";
import moment from "moment";

import "./HourDisplay.css";
import Thunderstorm from "../assets/icons/Thunderstorms";
import Sleet from "../assets/icons/Sleet";
import StormShowers from "../assets/icons/StormShowers";
import Snow from "../assets/icons/Snow";
import Fog from "../assets/icons/Fog";
import DaySun from "../assets/icons/DaySun";
import DayFog from "../assets/icons/DayFog";

class HourDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: "",
            dateText: moment(this.props.dateText).format("DD/MM/YY, h:mm:ss"),
            maxTemp: this.calculateCelsius(props.maxTemp),
            minTemp: this.calculateCelsius(props.minTemp),
            temperature: this.calculateCelsius(props.temperature),
            description: props.description
            //mainDesc: ""
        };

        this.weatherIcon = {
            Thunderstorm: <Thunderstorm />,
            Drizzle: <Sleet />,
            Rain: <StormShowers />,
            Snow: <Snow />,
            Atmosphere: <Fog />,
            ClearSky: <DaySun />,
            Clouds: <DayFog />
        };
    }

    calculateCelsius(temp) {
        let degrees = Math.floor(temp - 273.15);
        return degrees;
    }

    get_WeatherIcon(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
                this.setState({ icon: icons.Thunderstorm });
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({ icon: icons.Drizzle });
                break;
            case rangeId >= 500 && rangeId <= 521:
                this.setState({ icon: icons.Rain });
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({ icon: icons.Snow });
                break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({ icon: icons.Atmosphere });
                break;
            case rangeId == 800:
                this.setState({ icon: icons.ClearSky });
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({ icon: icons.Clouds });
                break;
            default:
                this.setState({ icon: icons.Clouds });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.icon !== prevProps.icon) {
            this.get_WeatherIcon(this.weatherIcon, this.props.icon);
            this.setState({ icon: this.props.icon });
        }
    }

    render() {
        const { dateText, icon, maxTemp, minTemp, temperature, description } = this.state;
        return (
            <div className="p-2 bd-highlight font-weight-normal d-flex flex-wrap flex-column bd-highlight mb-3">
                <span className="">{dateText}</span>
                <span className="">
                    <i>{icon}</i>
                </span>
                <span className="text-small p-2">max: {maxTemp}&deg;&nbsp;min: {minTemp}&deg;</span>
                <span className="font-weight-bold">avg: {temperature}&deg;</span>
                <p className="">{description}</p>
            </div>
        );
    }
}

export default HourDisplay;