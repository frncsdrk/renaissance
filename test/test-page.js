// page
'use strict';

define(
    [
        'renaissance'
        , 'node_modules/renaissance-test/renaissance-test'
        , 'node_modules/renaissance-test-html-reporter/renaissance-test-html-reporter'

        // components to test
        , 'node_modules/renaissance-local-storage/localStorage'
        // specs
        , 'specs/localStorage.spec'
        , 'specs/renaissance.spec'
    ]
    , function(renaissance, test, htmlReporter, localStorage, localStorageSpec, renaissanceSpec) {
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
            var renaissanceSpecResult = renaissanceSpec(renaissance);
            renaissance.adapters.htmlReporter.report([specResult, renaissanceSpecResult]);
        }

        return init;
    }
);
