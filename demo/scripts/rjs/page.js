// page rjs component
'use strict';

define(
    [
        'lib/core'

        , 'scripts/rjs/local_storage'
        , 'scripts/rjs/template_adapter'
        , 'scripts/rjs/spa_adapter'

        , 'scripts/rjs/append_html_drink'

        , 'scripts/rjs/test'
        , 'scripts/rjs/counter_list'
        , 'scripts/rjs/spa_anchor'
    ]
    , function(renaissance, localStorage, underscoreTemplates, spaAdapter, appendHTML, testComponent, counterList, spaAnchor) {
        // console.log('in page');
        function init() {
            // adapters
            localStorage();
            underscoreTemplates();
            spaAdapter();

            // spa registration
            var renaissanceSpa = renaissance.adapters.spa;
            renaissanceSpa.register('page1', '#page1-container');
            renaissanceSpa.register('page2', '#page2-container');
            renaissanceSpa.goto('page1');

            // drinks
            appendHTML();

            // components
            testComponent.attachTo('#test-component-button');

            testComponent.attachTo('.button2');

            counterList.attachTo('#counter-list');

            spaAnchor.attachTo('#goto-page1');
            spaAnchor.attachTo('#goto-page2')
        }

        return init;
    }
);
