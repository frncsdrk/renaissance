// storage adapter
function localStorageAdapter() {
    this.save = function(key, value) {
        localStorage.setItem(key, value);
        return true;
    };
    this.update = function(key, value) {
        if (!localStorage.getItem(key)) {
            return false;
        }
        localStorage.setItem(key, value);
        return true;
    };
    this.get = function(key) {
        return localStorage.getItem(key);
    };
    this.remove = function(key) {
        localStorage.removeItem(key);
        return true;
    };
    this.clear = function() {
        localStorage.clear();
    };
}

potion.registerAdapter(potion.storage, 'localStorage', localStorageAdapter);