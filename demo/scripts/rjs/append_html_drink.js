// append html drink
'use strict';

define(
    [
        'lib/coreRjs'
    ]
    , function(potion) {
        function appendHTML(html, node) {
            var elem = document.createElement('div');
            elem.innerHTML = html;
            var children = elem.childNodes;

            for (var i = 0; i < children.length; i++) {
                node.appendChild(children[i]);
            }
        }

        return function() {
            potion.registerDrink('appendHTML', appendHTML);
        };
    }
);
