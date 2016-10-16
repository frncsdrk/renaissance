// page rjs component
'use strict';

define(
    [
        'scripts/rjs/local_storage'
        , 'scripts/rjs/template_adapter'

        , 'scripts/rjs/append_html_drink'

        , 'scripts/rjs/test'
        , 'scripts/rjs/counter_list'
    ]
    , function(localStorage, underscoreTemplates, appendHTML, testComponent, counterList) {
        // console.log('in page');
        function init() {
            // adapters
            localStorage();
            underscoreTemplates();

            // drinks
            appendHTML();

            // components
            testComponent.attachTo('#test-component-button');

            testComponent.attachTo('.button2');

            counterList.attachTo('#counter-list');
        }

        return init;
    }
);
