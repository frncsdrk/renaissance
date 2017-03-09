// renaissance test html reporter
'use strict';

define(
    [
        'renaissance'
        , '../demo/scripts/rjs/append_html_drink'
    ]
    , function(renaissance, appendHTML) {
        // appendHTML drink
        appendHTML();

        function htmlReporter(specResults) {
            console.log(specResults);

            for (var i = 0; i < specResults.length; i++) {
                //
            }
        }

        return function() {
            renaissance.registerAdapter('htmlReporter', htmlReporter);
        }
    }
);
