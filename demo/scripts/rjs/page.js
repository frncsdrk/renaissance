// page rjs component
'use strict';

define(
    [
        'scripts/rjs/local_storage'
        , 'scripts/rjs/test'
    ]
    , function(localStorage, testComponent) {
        // console.log('in page');
        function init() {
            // adapters
            localStorage();

            // components
            testComponent.attachTo('#test-component-button');

            testComponent.attachTo('.button2');
        }

        return init;
    }
);
