# potion
healing js components  

Heavily inspired by [twitter's flightjs](https://flightjs.github.io/).  
potion is a little slimmer though.

## usage
potion is based on requirejs. So I recommend you to read a little about how to use it on their site.  
Below are some simple examples on how to use potion. You can also have a look in the demo directory of this project to see a simple project outline.

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
        'potion'
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

        return potion.defineComponent(component);
    }
);
```
This is what a basic component looks like.

### registering components, enabling adapters and drinks
page
```javascript
'use strict';

define(
    [
        './component'
        './adapter'
        './drink'
    ]
    , function(component, adapter, drink) {
        adapter();
        drink();

        component.attachTo('body');

        component.attachTo('.container')
        component.attachTo('#certain-button');
    }
);
```

### example main
```javascript
requirejs.config({
    baseUrl: './'
    , paths: {
        'text': 'bower_components/text/text'
        , 'lib': '../lib'
        , 'templates': 'templates'
    }
});

require(
    [
        //
    ]
    , function() {
        require(['scripts/rjs/page'], function(initialize) { // scripts
            initialize();
        });
    }
);
```
