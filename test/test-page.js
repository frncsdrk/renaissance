// page
'use strict';

define(
    [
        'renaissance'
        , 'renaissance-test'
        , 'renaissance-test-html-reporter'

        // components to test
        , '../demo/scripts/rjs/local_storage'
        // specs
        , 'specs/localStorage.spec'
    ]
    , function(renaissance, test, htmlReporter, localStorage, localStorageSpec) {
        function init() {
            // console.log('initialize');

            // init test plugin
            test();
            htmlReporter();

            // adapters
            localStorage();

            // run specs for components
            var specResult = localStorageSpec(renaissance.adapters.localStorage);
            // console.log(specResult);
            renaissance.adapters.htmlReporter.report([specResult]);
        }

        return init;
    }
);
