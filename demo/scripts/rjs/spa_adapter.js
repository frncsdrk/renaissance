// single page app adapter
'use strict';

define(
    [
        'lib/core'
        , 'lib/adapter'
    ]
    , function(potion, registerAdapter) {
        function spaAdapter() {
            var meta = {
                'containerSelector': '.spa-container'
            };

            this.pages = {};

            this.register = function(name, slctr) {
                this.pages[name] = slctr;
            };
            // this.unregister = function() {};

            this.goto = function(name) {
                var spaContainers = potion.utils.getNodes(meta.containerSelector);
                var container = potion.utils.getNodes(this.pages[name])[0];

                for (var i = 0; i < spaContainers.length; i++) {
                    var cont = spaContainers[i];
                    cont.style.display = 'none';
                }

                container.style.display = 'block';
            };
        }

        return function() {
            registerAdapter(potion.adapters, 'spa', spaAdapter);
        }
    }
);
