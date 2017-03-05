// page
'use strict';

define(
    [
        'renaissance'
        , 'renaissance-test'

        // components to test
        , '../demo/scripts/rjs/local_storage'
        // specs
        , 'specs/localStorage.spec'
    ]
    , function(renaissance, test, localStorage, localStorageSpec) {
        function init() {
            // console.log('initialize');

            // init test plugin
            test();

            // adapters
            localStorage();

            // run specs for components
            var testResult = localStorageSpec(renaissance.adapters.localStorage);
            console.log(testResult);
        }

        return init;
    }
);
