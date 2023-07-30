import * as model from './model.js';
import userWeatherInfoView from './views/userWeatherInfoView.js';

import 'core-js';
import 'regenerator-runtime/runtime.js';

const controlUserWeatherInfo = async function() {
    await model.userLocationWeather();
    
    userWeatherInfoView._render(model.state.userLocationWeather);
}

const init = function() {
    controlUserWeatherInfo();
};
init();