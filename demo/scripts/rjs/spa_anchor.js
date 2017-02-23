// spa anchor
'use strict';

define(
    [
        'lib/core'
    ]
    , function(renaissance) {
        function spaAnchor() {
            var self = this;

            var meta = {
                spa: renaissance.adapters.spa
            };

            this.href = function(e) {
                var pageId = e.target.getAttribute('data-pageref');
                meta.spa.goto(pageId);
            };
            
            this.after('init', function(component) {
                component.on('click', self.href);
            });
        }

        return renaissance.defineComponent(spaAnchor);
    }
);
