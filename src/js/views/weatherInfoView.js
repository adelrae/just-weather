export default class WeatherInfoView {
    _parentElement = document.querySelector('.weather-info');
    _data;


    _render(data) {
        this._data = data;
        console.log(this._data);

        const markup = this._generateMarkup();
        this._clear();

        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
}