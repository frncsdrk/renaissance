// test rjs component
'use strict';

define(
    [
        'lib/core'
    ]
    , function(potion) {
        function testComponent() {
            var self = this;

            var meta = {
                storage: potion.adapters.localStorage
            }

            this.add = function() {
                if (!meta.storage.get('counter')) {
                    meta.storage.save('counter', 1);
                }
                else {
                    var val = parseInt(meta.storage.get('counter'), 10) + 1;
                    meta.storage.update('counter', val);
                }

                this.trigger('counter_list.render', { content: 'fresh' });
            };

            this.rename = function() {
                self.node.innerHTML += ' yolo button';
            };

            // keyword: after
            this.after('init', function(component) {
                // keyword: on
                component.on('click', function() {
                    console.log('testComponent click');
                    // console.log('testComponent meta content:', self.meta.content);
                    self.rename();
                    self.add();
                });
                console.log('component:', component);
                // component.node.addEventListener('click', function() { console.log('testComponent click'); });
            });

            // return this;
        }

        return potion.defineComponent(testComponent);
    }
);
