// local storage rjs
'use strict';

define(
    [
        'lib/core'
    ],
    function(renaissance) {
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

        return function() {
            renaissance.registerAdapter('localStorage', localStorageAdapter);
        };
    }
);
