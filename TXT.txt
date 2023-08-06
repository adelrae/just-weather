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
        'clear - sunny': {
            day: weatherSVGs.morningClear,
            night: weatherSVGs.nightClear,
            icons: {
                day: `${icons}#sun-icon`,
                night: `${icons}#moon-icon`,
            },
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
        'fogg - mist': {
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


    _render(data) {
        this._data = data;

        const markup = this._generateMarkup();
        this._clear();
        this._alertBox.classList.add('hidden');

        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _checkWeatherType(){
        const weatherTypeText = this._data.weatherType.toLowerCase();

        for (type in Object.entries(this._weatherTypeMapping)) {
            console.log(type);
        };
        // console.log(this._weatherTypeMapping);


        // if(this._data.isDay) {
        //     if (weatherTypeText.includes('cloud')) {
        //         this._weatherTypeSvg = weatherSVGs.morningDayCloudy;
        //         this._weatherTypeIcon = `${icons}#cloud-icon`;
        //     };
        //     if (weatherTypeText.includes('clear') || weatherTypeText.includes('sunny')) {
        //         this._weatherTypeSvg = weatherSVGs.morningClear;
        //         this._weatherTypeIcon = `${icons}#sun-icon`;
        //     };
        //     if (weatherTypeText.includes('rain')) {
        //         this._weatherTypeSvg = weatherSVGs.morningDayRainy;
        //         this._weatherTypeIcon = `${icons}#cloud-rain-icon`;
        //     };
        //     if (weatherTypeText.includes('snow')) {
        //         this._weatherTypeSvg = weatherSVGs.morningDaySnow;
        //         this._weatherTypeIcon = `${icons}#cloud-snow-icon`;
        //     };
        //     if (weatherTypeText.includes('wind')) {
        //         this._weatherTypeSvg = weatherSVGs.morningDayWind;
        //         this._weatherTypeIcon = `${icons}#wind-icon`;
        //     };
        //     if (weatherTypeText.includes('fogg') || weatherTypeText.includes('mist')) {
        //         this._weatherTypeSvg = weatherSVGs.morningFoggy;
        //         this._weatherTypeIcon = `${icons}#fogg-icon`;
        //     };
        //     if (weatherTypeText.includes('thundery')) {
        //         this._weatherTypeSvg = weatherSVGs.morningDayThundery;
        //         this._weatherTypeIcon = `${icons}#cloud-thunder-icon`;
        //     };
        //     if (weatherTypeText.includes('overcast')) {
        //         this._weatherTypeSvg = weatherSVGs.overcast;
        //         this._weatherTypeIcon = `${icons}#cloud-icon`;
        //     };

        // } else {

        //     if (weatherTypeText.includes('cloud')) {
        //         this._weatherTypeSvg = weatherSVGs.nightCloudy;
        //         this._weatherTypeIcon = `${icons}#cloud-icon`;
        //     };
        //     if (weatherTypeText.includes('clear')) {
        //         this._weatherTypeSvg = weatherSVGs.nightClear;
        //         this._weatherTypeIcon = `${icons}#moon-icon`;
        //     };
        //     if (weatherTypeText.includes('rain')) {
        //         this._weatherTypeSvg = weatherSVGs.nightRainy;
        //         this._weatherTypeIcon = `${icons}#cloud-rain-icon`;
        //     };
        //     if (weatherTypeText.includes('snow')) {
        //         this._weatherTypeSvg = weatherSVGs.nightSnow;
        //         this._weatherTypeIcon = `${icons}#cloud-snow-icon`;
        //     };
        //     if (weatherTypeText.includes('wind')) {
        //         this._weatherTypeSvg = weatherSVGs.nightWind;
        //         this._weatherTypeIcon = `${icons}#wind-icon`;
        //     };
        //     if (weatherTypeText.includes('fogg') || weatherTypeText.includes('mist')) {
        //         this._weatherTypeSvg = weatherSVGs.morningFoggy;
        //         this._weatherTypeIcon = `${icons}#fogg-icon`;
        //     };
        //     if (weatherTypeText.includes('thundery')) {
        //         this._weatherTypeSvg = weatherSVGs.nightThundery;
        //         this._weatherTypeIcon = `${icons}#cloud-thunder-icon`;
        //     };
        //     if (weatherTypeText.includes('overcast')) {
        //         this._weatherTypeSvg = weatherSVGs.overcast;
        //         this._weatherTypeIcon = `${icons}#cloud-icon`;
        //     };
        // }
    }

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

    _clear() {
        this._parentElement.innerHTML = '';
    }
}