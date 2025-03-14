import View from "./View.js";
// import icons from "url:../../images/icons.svg";

class DisplayWeatherInfoView extends View {
  _parentElement = document.querySelector(".weather-info");

  _generateMarkup() {
    this._optimizingDate();
    this._checkWeatherType();

    return `
            <div class="left-box flex-2 left">
                <div class="current-temperature">${Math.round(
                  this._data.tempC
                )}°</div>
                <div class="location">
                    <div class="location-country">
                        <div class="country-flag">
                            <img src="${this._data.flag}" alt="">
                        </div>
                        <span class="country-name">${this._data.country}, ${
      this._data.city
    }</span>
                    </div>
                    <div class="weather-type">
                        <svg>
                            <use href="${this._weatherTypeIcon}"></use>
                        </svg>
                        <span class="weather-type-text">${
                          this._data.weatherType
                        }</span>
                    </div>
                </div>
                <div class="location-date">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <span class="date">${this._localTime}</span>
                </div>
            </div>
            <div class="weather-illust flex-3 center">
                <div class="weather">
                    <img src="${this._weatherTypeSvg}">
                </div>
            </div>
            <div class="right-box flex-2 right">
                <div class="weather-details-contaienr">
                    <div class="weather-details">
                        <div class="status">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="26" height="26" x="0" y="0" viewBox="0 0 511.448 511.448" style="enable-background: new 0 0 512 512" xml:space="preserve" class=""><g><path d="M344.556 112.216C318.38 78.84 291.34 44.344 269.516 7.32c-5.76-9.76-21.824-9.76-27.552 0-21.856 37.024-48.896 71.52-75.072 104.896-53.056 67.68-103.168 131.616-103.168 207.232 0 105.888 86.112 192 192 192s192-86.112 192-192c0-75.616-50.112-139.552-103.168-207.232z" style="" fill="#2196f3" data-original="#2196f3" class=""></path><path d="M207.724 287.448c-26.464 0-48-21.536-48-48s21.536-48 48-48 48 21.536 48 48-21.536 48-48 48zm0-64c-8.832 0-16 7.168-16 16s7.168 16 16 16 16-7.168 16-16-7.168-16-16-16zM303.724 447.448c-26.464 0-48-21.536-48-48s21.536-48 48-48 48 21.536 48 48-21.536 48-48 48zm0-64c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zM175.724 415.448a16.07 16.07 0 0 1-11.328-4.672c-6.24-6.24-6.24-16.384 0-22.624l160-160c6.24-6.24 16.384-6.24 22.624 0s6.24 16.384 0 22.624l-160 160a15.943 15.943 0 0 1-11.296 4.672z" style="" fill="#fafafa" data-original="#fafafa" class=""></path></g></svg>
                            <span class="status-title">${
                              this._data.humidity
                            }%</span>
                        </div>
                        <div class="status">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="26" height="26" x="0" y="0" viewBox="0 0 64 64" style="enable-background: new 0 0 512 512" xml:space="preserve" class=""><g><path d="M3 27s12-8 29-4 29-2 29-2-1.51 18.5-28 9c-5.9-2.117-11-5-30-3Z" style="" fill="#92cdde" data-original="#92cdde" class=""></path><path d="M9 32s11-4 24 3c8.805 4.741 22 1 22 1s-13 13-27 3c-3.913-2.795-10-7-19-7Z" style="" fill="#92cdde" data-original="#92cdde" class=""></path><path d="M45.75 20.749a26.97 26.97 0 0 1-5.975-.774 65.376 65.376 0 0 0-23.6-.991l-.358-1.967a66.151 66.151 0 0 1 24.4 1.008c6.2 1.431 9.079.471 10.407-.584A3.48 3.48 0 0 0 52 15a1 1 0 0 1 .02-.2 3.563 3.563 0 0 0-.61-2.631A4.246 4.246 0 0 0 48 11c-4.781 0-4.992 2.7-5 3.013L41 14c0-.05.08-5 7-5 2.253 0 3.924.645 4.966 1.916A5.524 5.524 0 0 1 54 15.106a5.519 5.519 0 0 1-2.119 3.9 9.626 9.626 0 0 1-6.131 1.743ZM50 57c-6.92 0-7-4.95-7-5h2c.008.3.219 3 5 3a3.961 3.961 0 0 0 3.18-1.178 5.181 5.181 0 0 0 .834-3.658A1 1 0 0 1 54 50a2.473 2.473 0 0 0-1.056-1.7c-1.283-.981-4.182-1.832-10.719-.323-13.417 3.091-24.5-8.791-24.962-9.3l1.473-1.352c.107.115 10.766 11.537 23.039 8.7 5.927-1.368 10.122-1.117 12.467.749A4.4 4.4 0 0 1 56 49.908a7.063 7.063 0 0 1-1.291 5.207A5.849 5.849 0 0 1 50 57Z" style="" fill="#418abd" data-original="#418abd" class=""></path><path d="M33 52c-7.292 0-15.32-6.951-15.658-7.247l1.316-1.506C18.735 43.314 26.463 50 33 50ZM9.511 17.859l-1.026-1.716C8.7 16.015 13.862 13 26 13v2c-11.5 0-16.44 2.831-16.489 2.859ZM28 13h2v2h-2z" style="" fill="#418abd" data-original="#418abd" class=""></path><path d="M11 37h2v2h-2zM11 41h2v2h-2zM9 39h2v2H9zM13 39h2v2h-2zM36 53h2v2h-2zM36 57h2v2h-2zM34 55h2v2h-2zM38 55h2v2h-2zM35 7h2v2h-2zM35 11h2v2h-2zM33 9h2v2h-2zM37 9h2v2h-2zM8 7h2v2H8zM8 11h2v2H8zM6 9h2v2H6zM10 9h2v2h-2z" style="" fill="#92cdde" data-original="#92cdde" class=""></path><path d="M46.406 29.605a26.782 26.782 0 0 1-5.616-.627l.42-1.956c13.118 2.809 17.869-5.423 17.916-5.507l1.748.97c-.046.083-4.095 7.12-14.468 7.12Z" style="" fill="#418abd" data-original="#418abd" class=""></path></g></svg>
                            <span class="status-title">${Math.round(
                              this._data.windSpeed
                            )} km/h</span>
                        </div>
                        <div class="status">
                            <svg>
                                <use href="${
                                  this._data.isDay ? `#sunset` : `#sunrise`
                                }"></use>
                            </svg>
                            <span class="status-title">${
                              this._data.isDay
                                ? this._data.sunset
                                : this._data.sunrise
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}

export default new DisplayWeatherInfoView();
