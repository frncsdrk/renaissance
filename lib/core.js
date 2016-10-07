// core functionality

// compile components to minified js, add to 'namespace'
// -> could avoid requirejs, webpack, ...
// communication over events

var potion = {};

// private
// registry filled and emptied when attaching and unattaching components to DOM
potion.registry = {};
potion.registerComponent = function(component, node) {
    // register components event handlers on node
    potion.registry[component.toString()] = component;
};
potion.unregisterComponent = function(component) {
    // unregister components event handlers on node
    delete potion.registry[component.toString()];
};
potion.registerAdapter = function() {};
potion.registerDrink = function() {};

// public
potion.component = function() {
    return this;
};
potion.component.prototype.attachTo = function(node) {
    //
    potion.registerComponent(this, node);
};
potion.prototype.unattachFrom = function(node) {
    potion.unregisterComponent(this, node);
};

// adapters
// internal private
// interface public

// logger public

// debug (depends on logger) public

// utils private

// drinks (add functionality to public functions) mixin-like

// public
potion.app = function() {
    return this;
};
potion.app.prototype.run = function() {
    // run init callback (attaching components to nodes)
};
