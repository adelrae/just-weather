import * as model from './model.js';
import displayWeatherInfoView from './views/displayWeatherInfoView.js';
import searchInputView from './views/searchInputView.js';

import 'core-js';
import 'regenerator-runtime/runtime.js';

const controlUserWeatherInfo = async function() {
    displayWeatherInfoView._renderLoader();

    await model.userLocationWeather();
    
    displayWeatherInfoView._render(model.state.userLocationWeather);
}

const controlSearchInput = async function() {
    displayWeatherInfoView._renderLoader();

    const query = searchInputView._getQuery();

    await model.searchLocationWeather(query);

    displayWeatherInfoView._render(model.state.searchLocationWeather);
}

const init = function() {
    controlUserWeatherInfo();
    searchInputView._formHandler(controlSearchInput);
};
init();