import View from "./View";

class DisplayAlertView extends View{
    _closeAlertBtn = document.querySelector('.close-alert');
    _errStatus;
    _errMsg = 'Something is wrong! Try agin!';

    constructor() {
        super()

        // attach close-alert-btn handler
        this._handlerCloseAlertBtn();
    }

    // get error
    _getErr(errStatus) {
        this._errStatus = errStatus;
        if (errStatus === 400) this._errMsg =  `We could NOT find anything! Try agin!`;

        this._renderErr();
    }

    // render error
    _renderErr() {
        // clear weather-info section
        document.querySelector('.weather-info').innerHTML = '';

        // set alert message
        this._alertBox.querySelector('.alert-desc').textContent = this._errMsg;

        // show alert-box
        this._alertBoxToggle();
    }

    // close-alert-btn e-listener
    _handlerCloseAlertBtn() {
        this._closeAlertBtn.addEventListener('click', this._alertBoxToggle.bind(this));
    }
    
    // alert-box toggle
    _alertBoxToggle() {
        this._alertBox.classList.toggle('hidden');
    }


};

export default new DisplayAlertView();