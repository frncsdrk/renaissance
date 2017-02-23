// single page app adapter
/*
 * fix for shortly appearing containers
 * .spa-container {
 *     display: none;
 * }
 */
'use strict';

define(
    [
        'lib/core'
    ]
    , function(renaissance, registerAdapter) {
        function spaAdapter() {
            var meta = {
                'containerSelector': '.spa-container'
            };

            this.pages = {};

            /**
             * register a spa container
             * @param {string} name
             * @param {string} slctr
             * @returns {*}
             */
            this.register = function(name, slctr) {
                this.pages[name] = slctr;
            };

            /**
             * go to given page
             * @param {string} name
             * @returns {*}
             */
            this.goto = function(name) {
                var spaContainers = renaissance.utils.getNodes(meta.containerSelector);
                var container = renaissance.utils.getNodes(this.pages[name])[0];

                for (var i = 0; i < spaContainers.length; i++) {
                    var cont = spaContainers[i];
                    cont.style.display = 'none';
                }

                container.style.display = 'block';
            };
        }

        return function() {
            renaissance.registerAdapter('spa', spaAdapter);
        }
    }
);
