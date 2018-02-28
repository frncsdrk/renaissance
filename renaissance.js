// renaissance core
'use strict';

var renaissance = {};

// private
// registry filled and emptied when attaching and unattaching components to DOM
// renaissance.registry = {};
// renaissance.components = {};
renaissance.adapters = {};
renaissance.storage = {};
renaissance.template = {};
renaissance.drinks = {};
// private / only available for adapter and drink creators
/**
 * register component internally
 * @param {object} component
 * @param {object} node
 * @returns {object} component
 */
renaissance.registerComponent = function(component, node) {
    // set node
    component.setNode(node);
    console.log(component);
    // event handlers
    if (typeof component.afterMap['init'] === 'function') {
        component.afterMap['init'](component);
    }

    return component;
};
/**
 * register an Adapter
 * @param {object} renaissance extendable
 * @param {string} adapter name
 * @param {object} adapter constructor
 */
renaissance.registerAdapter = function(name, Adapter) {
    var adapter = new Adapter();

    renaissance.adapters[name] = {};

    for (var fn in adapter) {
        renaissance.adapters[name][fn] = adapter[fn];
    }
};
/**
 * register a drink, same as a mixin
 * @param {string} name
 * @param {function} callback
 * @returns {boolean}
 */
renaissance.registerDrink = function(name, cb) {
    // avoid overwriting other functionality
    if (typeof renaissance.Component.prototype[name] !== 'undefined') {
        return false;
    }

    // register drink on component prototype
    renaissance.Component.prototype[name] = cb;

    return true;
};
/**
 * register a plugin
 * @param {function} plugin
 * @return {boolean} registered
 */
renaissance.registerPlugin = function(name, plugin) {
    if (typeof renaissance[name] !== 'undefined') {
        return false;
    }

    // register plugin function on renaissance prototype
    renaissance[name] = plugin;

    return false;
};

// private
/** wrapper for bare component definition
 * @param {object} component
 * @returns {object} component
 */
renaissance.defineComponent = function(Component) {
    return new renaissance.Attachable(Component);
};
/**
 * component
 * @constructor
 * @returns {object} this
 */
renaissance.Component = function() {
    // this.beforeMap = {};
    // this.afterMap = {};

    return this;
};
renaissance.Component.prototype.beforeMap = {};
renaissance.Component.prototype.afterMap = {};
/**
 * set node
 * @param {object} node
 * @returns {*}
 */
renaissance.Component.prototype.setNode = function(node) {
    this.node = node;
};
/**
 * add an event handler on component
 * @param {string} event
 * @param {function} callback
 * @returns {*}
 */
renaissance.Component.prototype.on = function(nodeEv, cb) {
    this.node.addEventListener(nodeEv, cb);
};
/**
 * expose an event to other components and make it triggerable
 * (for custom events)
 * @param {string} event
 * @param {function} callback
 * @returns {*}
 */
renaissance.Component.prototype.expose = function(evName, cb) {
    document.addEventListener(evName, function(e) { cb(e, e.detail); });
};
// trigger exposed events
/**
 * trigger exposed event
 * @param {string} event name
 * @param {object} event data
 * @returns {*}
 */
renaissance.Component.prototype.trigger = function(evName, evData) {
    // console.log('evData:', evData);
    var ev = new CustomEvent(evName, { detail: evData });
    document.dispatchEvent(ev);
};
/**
 * register before event
 * @param {string} event
 * @param {function} callback
 */
renaissance.Component.prototype.before = function(ev, cb) {
    // if (typeof this.beforeMap !== 'object') this.beforeMap = {};
    this.beforeMap[ev] = cb;
};
/**
 *register after event
 * @param {string} event
 * @param {function} callback
 */
renaissance.Component.prototype.after = function(ev, cb) {
    // if (typeof this.afterMap !== 'object') this.afterMap = {};
    this.afterMap[ev] = cb;
};
/**
 * Attachable class
 * @constructor
 * @param {object} Blueprint
 * @returns {object} this
 */
renaissance.Attachable = function(Blueprint) {
    this.Blueprint = Blueprint;
    this.Blueprint.prototype = renaissance.Component.prototype;

    return this;
};
/**
 * attach component to selected elements
 * @param {string} selector
 * @returns {array} components
 */
renaissance.Attachable.prototype.attachTo = function(selector) {
    var componentArr = [];
    var nodes = renaissance.utils.getNodes(selector);
    // register a component for every found node
    for (var i = 0; i < nodes.length; i++) {
        var component = renaissance.registerComponent(new this.Blueprint(), nodes[i]);
        componentArr.push(component);
    }

    return componentArr;
};

// logger public

// debug (depends on logger) public

// utils private
renaissance.utils = {};
/**
 * get nodes by selector
 * @param {string} selector
 * @returns {object} NodeList
 */
renaissance.utils.getNodes = function(slctr) {
    // try to use query selector all on slctr with attribute
    if (slctr.match(/^.+\[.+\]$/)) {
        return document.querySelectorAll(slctr);
    }

    // default - use standard selector statements
    // node
    if (typeof slctr === 'object') {
        return [slctr];
    }
    // id
    else if (slctr.charAt(0) === '#') {
        slctr = slctr.substring(1);
        return [document.getElementById(slctr)];
    }
    // class
    else if (slctr.charAt(0) === '.') {
        slctr = slctr.substring(1);
        return document.getElementsByClassName(slctr);
    }
    // tag
    else if (typeof slctr === 'string') {
        return document.getElementsByTagName(slctr);
    }
};

export default renaissance
