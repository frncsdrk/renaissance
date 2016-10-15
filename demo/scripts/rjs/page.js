// page rjs component
'use strict';

define(
    ['scripts/rjs/test']
    , function(testComponent) {
        console.log('in page');
        function init() {
            testComponent.attachTo('#test-component-button');

            testComponent.attachTo('.button2');
        }

        return init;
    }
);
