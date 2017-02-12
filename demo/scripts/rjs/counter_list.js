// counter list
'use strict';

define(
    [
        'lib/core'
        , 'text!templates/counterLi.html'
    ]
    , function(potion, counterTmpl) {
        function counterList() {
            var self = this;

            var meta = {
                underscore: potion.adapters.underscore
            };
            var template = meta.underscore.tmpl(counterTmpl);

            this.render = function(e, data) {
                // var elem = document.createElement('div');
                // elem.innerHTML = template(data);
                // var children = elem.childNodes;

                // for (var i = 0; i < children.length; i++) {
                    // self.node.appendChild(children[i]); // template(data)
                // }

                console.log('data:', data);

                self.appendHTML(template(data), self.node);
            };

            this.after('init', function(component) {
                // component.on('');
                component.expose('counter_list.render', self.render);
            });
        }

        return potion.defineComponent(counterList);
    }
);
