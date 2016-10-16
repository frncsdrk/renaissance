// append html drink
'use strict';

define(
    [
        'lib/drink'
    ]
    , function(registerDrink) {
        function appendHTML(html, node) {
            var elem = document.createElement('div');
            elem.innerHTML = html;
            var children = elem.childNodes;

            for (var i = 0; i < children.length; i++) {
                node.appendChild(children[i]);
            }
        }

        return function() {
            registerDrink('appendHTML', appendHTML);
        };
    }
);
