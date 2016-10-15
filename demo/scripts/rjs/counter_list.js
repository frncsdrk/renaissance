// counter list
'use strict';

define(
    [
        'lib/coreRjs'
        , 'text!templates/counterLi.html'
    ]
    , function(potion, counterTmpl) {
        function counterList() {
            var meta = {
                tmpl: potion.template.underscore
            };
            // var template = utils.tmpl(counterTmpl);

            this.render = function(e, data) {
                this.node.appendChild(tmpl.render(counterTmpl, data));
            };

            this.after('init', function(component) {
                component.on('');
            });
        }

        return potion.defineComponent(counterList);
    }
);
