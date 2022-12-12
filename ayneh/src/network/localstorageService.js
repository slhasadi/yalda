const LocalStorageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
            _service = this;
            return _service
        }
        return _service
    }  
    function _setToken(token) {
        localStorage.setItem("token", token);
    }
    function _getToken() {
        return localStorage.getItem("token");
    }
    function _setIsNew(isNew) {
        localStorage.setItem("is_new", isNew);
    }
    function _getIsNew() {
        return localStorage.getItem("is_new");
    }
    function _clearToken() {
        localStorage.removeItem("token");
    }
    return {
        getService : _getService,
        setToken : _setToken,
        getToken: _getToken,
        setIsNew: _setIsNew,
        getIsNew: _getIsNew,
        clearToken : _clearToken
    }
})();
export default LocalStorageService;