// append html drink
'use strict';

define(
    [
        'potion/drink'
    ]
    , function(registerDrink) {
        function appendHTML(html, node, cb) {
            var elem = document.createElement('div');
            elem.innerHTML = html;
            var children = elem.children;

            cb(children);

            for (var i = 0; i < children.length; i++) {
                node.appendChild(children[i]);
            }
        }

        return function() {
            registerDrink('appendHTML', appendHTML);
        };
    }
);
