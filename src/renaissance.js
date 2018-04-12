// renaissance core
'use strict';
import 'babel-core/register'
import 'babel-polyfill'

let renaissance = {};

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
 * @param {string} adapterName
 * @param {object} adapterConstructor
 */
renaissance.registerAdapter = function(adapterName, adapterConstructor) {
    let adapter = new Adapter();

    renaissance.adapters[name] = {};

    for (let fn in adapter) {
        renaissance.adapters[name][fn] = adapter[fn];
    }
};
/**
 * register a drink, same as a mixin
 * @param {string} name
 * @param {function} callback
 * @returns {boolean}
 */
renaissance.registerDrink = function(name, callback) {
    // avoid overwriting other functionality
    if (typeof renaissance.Component.prototype[name] !== 'undefined') {
        return false;
    }

    // register drink on component prototype
    renaissance.Component.prototype[name] = callback;

    return true;
};
/**
 * register a plugin
 * @param {string} name
 * @param {function} plugin
 * @return {boolean} registered
 */
renaissance.registerPlugin = function(name, plugin) {
    // if name already defined on prototype, omit registration
    if (typeof renaissance[name] !== 'undefined') {
        return false;
    }

    // register plugin function on renaissance prototype
    renaissance[name] = plugin;

    return false;
};

// private
/** wrapper for bare component definition
 * @param {object} Component
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
 * @param {string} nodeEvent
 * @param {function} callback
 * @returns {*}
 */
renaissance.Component.prototype.on = function(nodeEvent, callback) {
    this.node.addEventListener(nodeEvent, callback);
};
/**
 * expose an event to other components and make it triggerable
 * (for custom events)
 * @param {string} eventName
 * @param {function} callback
 * @returns {*}
 */
renaissance.Component.prototype.expose = function(eventName, callback) {
    document.addEventListener(evName, function(e) { cb(e, e.detail); });
};
// trigger exposed events
/**
 * trigger exposed event
 * @param {string} eventName
 * @param {object} eventData
 * @returns {*}
 */
renaissance.Component.prototype.trigger = function(eventName, eventData) {
    // console.log('evData:', evData);
    let ev = new CustomEvent(eventName, { detail: eventData });
    document.dispatchEvent(ev);
};
/**
 * register before event
 * @param {string} event
 * @param {function} callback
 */
renaissance.Component.prototype.before = function(event, callback) {
    // if (typeof this.beforeMap !== 'object') this.beforeMap = {};
    this.beforeMap[event] = callback;
};
/**
 *register after event
 * @param {string} event
 * @param {function} callback
 */
renaissance.Component.prototype.after = function(event, callback) {
    // if (typeof this.afterMap !== 'object') this.afterMap = {};
    this.afterMap[event] = callback;
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
    let componentArr = [];
    let nodes = renaissance.utils.getNodes(selector);
    // register a component for every found node
    for (let i = 0; i < nodes.length; i++) {
        let component = renaissance.registerComponent(new this.Blueprint(), nodes[i]);
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
renaissance.utils.getNodes = function(selector) {
    // try to use query selector all on slctr with attribute
    if (selector.match(/^.+\[.+\]$/)) {
        return document.querySelectorAll(slctr);
    }

    // default - use standard selector statements
    // node
    if (typeof selector === 'object') {
        return [selector];
    }
    // id
    else if (selector.charAt(0) === '#') {
        selector = selector.substring(1);
        return [document.getElementById(selector)];
    }
    // class
    else if (selector.charAt(0) === '.') {
        selector = selector.substring(1);
        return document.getElementsByClassName(selector);
    }
    // tag
    else if (typeof selector === 'string') {
        return document.getElementsByTagName(selector);
    }
};

export default renaissance
