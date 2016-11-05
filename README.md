# potion
healing js components

## usage
potion is based on requirejs. So it is recommended that you at least know the basics of it.

### example application layout
```
- app
|
|-- data
| |
| |-- // components related to data
|
|-- ui
| |
| |-- // components related to ui
|
|-- main
|-- page
|
|-- index.html
```

### defining components
```javascript
'use strict';

define(
    [
        'potion/component'
    ]
    , function(defineComponent) {
        function component() {
            var self = this;

            var meta = {
                // you can use an object like this to keep constants  
                // that you need throughout the component
            };

            // this.do = function() {};

            this.after('init', function(component) {
                // component.on();
                // component.expose()
            });
        }

        return defineComponent(component);
    }
);
```
This is what a basic component looks like.

### registering components
page
```javascript
'use strict';

define(
    [
        './component'
    ]
    , function(component) {
        component.attachTo('body');

        component.attachTo('.container')
        component.attachTo('#certain-button');
    }
);
```
