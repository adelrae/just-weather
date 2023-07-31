class SearchInputView {
    _parentElement = document.querySelector('form');
    _searchInput = document.querySelector('.search-input');

    _getQuery() {
        const query = this._searchInput.value;
        this._clearInput();
        
        return query;
    }

    _formHandler(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();

            handler();
        })
    }

    _clearInput() {
        this._searchInput.value = '';
    }

}

export default new SearchInputView();