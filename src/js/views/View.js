import weatherSVGs from "../weatherSVGs.js";
import icons from 'url:../../images/icons.svg';

export default class View {
    _data;
    _localTime;
    _curHour;
    _weatherTypeMapping = {
        'cloud': {
            day: weatherSVGs.morningDayCloudy,
            night: weatherSVGs.nightCloudy,
            icon: `${icons}#cloud-icon`
        },
        'clear': {
            night: weatherSVGs.nightClear,
            icon: `${icons}#moon-icon`,
        },
        'sunny': {
            day: weatherSVGs.morningClear,
            icon: `${icons}#sun-icon`,
        },
        'rain': {
            day: weatherSVGs.morningDayRainy,
            night: weatherSVGs.nightRainy,
            icon: `${icons}#cloud-rain-icon`,
        },
        'snow': {
            day: weatherSVGs.morningDaySnow,
            night: weatherSVGs.nightSnow,
            icon: `${icons}#cloud-snow-icon`,
        },
        'wind': {
            day: weatherSVGs.morningDayWind,
            night: weatherSVGs.nightWind,
            icon: `${icons}#wind-icon`,
        },
        'fogg': {
            day: weatherSVGs.morningFoggy,
            night: weatherSVGs.morningFoggy,
            icon: `${icons}#fogg-icon`,
        },
        'mist': {
            day: weatherSVGs.morningFoggy,
            night: weatherSVGs.morningFoggy,
            icon: `${icons}#fogg-icon`,
        },
        'thundery': {
            day: weatherSVGs.morningDayThundery,
            night: weatherSVGs.nightThundery,
            icon: `${icons}#cloud-thunder-icon`,
        },
        'overcast': {
            day: weatherSVGs.overcast,
            night: weatherSVGs.overcast,
            icon: `${icons}#cloud-icon`,
        }
    }
    _weatherTypeSvg;
    _weatherTypeIcon;
    _alertBox = document.querySelector('.alert-box');

    // render weatherInfo
    _render(data) {
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._alertBox.classList.add('hidden');

        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    // check weather type
    _checkWeatherType(){
        const weatherTypeText = this._data.weatherType.toLowerCase();
        const weatherTypes = Object.entries(this._weatherTypeMapping);
        console.log(1);

        weatherTypes.forEach(type => {
            const typeText = type[0];
            const typeDetails = type[1];

            if (weatherTypeText.includes(typeText)) {
                console.log(weatherTypeText, type);

                this._weatherTypeIcon = typeDetails.icon;

                if (this._data.isDay) {
                    this._weatherTypeSvg = typeDetails.day;

                } else {
                    this._weatherTypeSvg = typeDetails.night;

                    if (weatherTypeText === 'clear') {
                        this._weatherTypeIcon = typeDetails.icon;
                    }
                }
            };
        })
    }

    // optimize date
    _optimizingDate() {
        const date = new Date(this._data.localTime);
        const options = {
            hour: 'numeric',
            minute: 'numeric',
        };
        
        const weekday = new Intl.DateTimeFormat('en-us', { weekday: 'long'}).format(date)
        const time = new Intl.DateTimeFormat('en-us', options).format(date);
        this._localTime = `${weekday}, ${time}`;

        this._curHour = date.getHours();
    }

    // render loader
    _renderLoader() {
        const markup = `
            <div class="loader">
                <svg version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <circle fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
                    <line fill="none" stroke-linecap="round" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                        <animateTransform 
                            attributeName="transform" 
                            dur="2s"
                            type="rotate"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite"
                        />
                    </line>
                    <line fill="none" stroke-linecap="round" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
                        <animateTransform 
                            attributeName="transform" 
                            dur="15s"
                            type="rotate"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite"
                        />
                    </line>
                </svg>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterBegin', markup);
    }

    // clear parent element
    _clear() {
        this._parentElement.innerHTML = '';
    }
}