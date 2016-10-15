// page rjs component
'use strict';

define(
    [
        'scripts/rjs/local_storage'
        , 'scripts/rjs/template_adapter'
        , 'scripts/rjs/test'
    ]
    , function(localStorage, underscoreTemplates, testComponent) {
        // console.log('in page');
        function init() {
            // adapters
            localStorage();
            underscoreTemplates();

            // components
            testComponent.attachTo('#test-component-button');

            testComponent.attachTo('.button2');
        }

        return init;
    }
);
