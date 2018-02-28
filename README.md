# renaissance
renovating js components 

> renaissance needs a renaissance. Doing that when I've got time. 

Heavily inspired by [twitter's flightjs](https://flightjs.github.io/) but lighter.  

## usage
renaissance is based on requirejs. So I recommend you to read a little about how to use it on [their site](http://requirejs.org/).  
Below are some simple examples on how to use renaissance. You can also have a look in the [demo repo](https://github.com/frncsdrk/renaissance-demo/) of this project to see a simple project outline.

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
        'renaissance'
    ]
    , function(renaissance) {
        function component() {
            var self = this;

            var meta = {
                // you can use an object like this to keep constants  
                // that you need throughout the component
            };

            // this.do = function() {};

            this.after('init', function(component) {
                component.on('click', function(e) {}); // add event listener for standard events that are triggered on HTML node directly
                component.expose('custom', function(e, data) {}); // expose custom events that will be triggered by other components
            });
        }

        return renaissance.defineComponent(component);
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
        function init() {
            adapter();
            drink();

            component.attachTo('body');

            component.attachTo('.container')
            component.attachTo('#certain-button');
            component.attachTo('div[class=example]');
        }

        return init;
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
        'page'
    ]
    , function(initialize) {
        initialize();
    }
);
```
