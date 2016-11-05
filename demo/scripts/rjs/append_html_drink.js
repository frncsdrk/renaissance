// append html drink
'use strict';

define(
    [
        'lib/drink'
    ]
    , function(registerDrink) {
        function appendHTML(html, node, cb) {
            var elem = document.createElement('div');
            elem.innerHTML = html;
            var children = elem.children;

            if (typeof cb === 'function') {
                cb(children);
            }

            for (var i = 0; i < children.length; i++) {
                node.appendChild(children[i]);
            }
        }

        return function() {
            registerDrink('appendHTML', appendHTML);
        };
    }
);