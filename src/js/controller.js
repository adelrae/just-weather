import * as model from './model.js';
import displayWeatherInfoView from './views/displayWeatherInfoView.js';
import searchInputView from './views/searchInputView.js';
import displayAlertView from './views/displayAlertView.js';

import 'core-js';
import 'regenerator-runtime/runtime.js';

const controlUserWeatherInfo = async function() {
    try {
        displayWeatherInfoView._renderLoader();

        await model.userLocationWeather();
        
        displayWeatherInfoView._render(model.state.userLocationWeather);
        
    } catch (err) {
        displayAlertView._getErr(err);
    }
}

const controlSearchInput = async function() {
    try {
        displayWeatherInfoView._renderLoader();

        const query = searchInputView._getQuery();
    
        await model.searchLocationWeather(query);
    
        displayWeatherInfoView._render(model.state.searchLocationWeather);
    } catch (err) {
        displayAlertView._getErr(err);
    }
}

const init = function() {
    controlUserWeatherInfo();
    searchInputView._formHandler(controlSearchInput);
};
init();