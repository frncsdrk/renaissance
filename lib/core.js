// core functionality

// compile components to minified js, add to 'namespace'
// -> could avoid requirejs, webpack, ...
// communication over events

var potion = {};

// registry filled and emptied when attaching and unattaching components to DOM
potion.registry = {};
potion.register = function(component) {
    potion.registry[component.toString()] = component;
}
potion.unregister = function(component) {
    delete potion.registry[component.toString()];
}

potion.component = function() {};
potion.attachTo = function(node) {};
potion.prototype.unattachFrom = function(node) {};

potion.app = function() {
    return this;
};
potion.app.prototype.run = function() {};
