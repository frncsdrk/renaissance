// storage adapter
function localStorageAdapter() {
    this.save = function() {};
    this.update = function() {};
    this.get = function() {};
    this.remove = function() {};
}

potion.registerAdapter(localStorageAdapter);
