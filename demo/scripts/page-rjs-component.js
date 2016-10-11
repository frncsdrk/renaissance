// page rjs component
'use strict';

define(
    ['test-rjs-component']
    , function(testComponent) {
        function init() {
            testComponent.attachTo('#test-component-button');

            testComponent.attachTo('.button2');
        }

        return init;
    }
);
