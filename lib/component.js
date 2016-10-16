// components: build

// initialize event
// var Component = function() {};

// get components with registry
// var components = registry.components;

// for (item in components) {
    //
// }

define(
    [
        './core'
    ]
    , function(potion) {
        // wrapper for bare component definition
        potion.defineComponent = function(Component) {
            return new potion.Attachable(Component);
        };

        return potion.defineComponent;
    }
);
