// renaissance core
'use strict';
import 'babel-core/register'
// import 'babel-polyfill'

let renaissance = {};

class Component {
    /**
     * component
     * @constructor
     * @returns {object} this
     */
    constructor() {
        this.beforeMap = {};
        this.afterMap = {};
        this.node = null;

        this.init && this.after('init', this.init);

        return this;
    }
    /**
     * set node
     * @param {object} node
     * @returns {*}
     */
    setNode(node) {
        this.node = node;
    }
    /**
     * add an event handler on component
     * @param {string} nodeEvent
     * @param {function} callback
     * @returns {*}
     */
    on(nodeEvent, callback) {
        this.node.addEventListener(nodeEvent, callback);
    }
    /**
     * expose an event to other components and make it triggerable
     * (for custom events)
     * @param {string} eventName
     * @param {function} callback
     * @returns {*}
     */
    expose(eventName, callback) {
        document.addEventListener(evName, function(e) { cb(e, e.detail); });
    }
    // trigger exposed events
    /**
     * trigger exposed event
     * @param {string} eventName
     * @param {object} eventData
     * @returns {*}
     */
    trigger(eventName, eventData) {
        // console.log('evData:', evData);
        let ev = new CustomEvent(eventName, { detail: eventData });
        document.dispatchEvent(ev);
    }
    /**
     * register before event
     * @param {string} event
     * @param {function} callback
     */
    before(event, callback) {
        // if (typeof this.beforeMap !== 'object') this.beforeMap = {};
        this.beforeMap[event] = callback;
    }
    /**
     *register after event
     * @param {string} event
     * @param {function} callback
     */
    after(event, callback) {
        // if (typeof this.afterMap !== 'object') this.afterMap = {};
        this.afterMap[event] = callback;
    }
}

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
    // event handlers
    if (typeof component.afterMap['init'] === 'function') {
        component.afterMap['init'](component);
    }

    return component;
};
/**
 * register an Adapter
 * @param {string} name
 * @param {object} Adapter
 */
renaissance.registerAdapter = function(name, Adapter) {
    let adapter = new Adapter();
    renaissance.adapters[name] = adapter;
    return adapter;
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
/**
 * attach component to selected elements
 * @param {object} component
 * @param {string} selector
 * @returns {array} components
 */
renaissance.utils.attachTo = function(component, selector) {
    let componentArr = [];
    let nodes = renaissance.utils.getNodes(selector);
    // register a component for every found node
    for (let i = 0; i < nodes.length; i++) {
        renaissance.registerComponent(component, nodes[i]); // this.Blueprint
        componentArr.push(component);
    }

    return componentArr;
};

const r = renaissance;
const registerAdapter = renaissance.registerAdapter;
const utils = renaissance.utils;

export {
    renaissance
    , r
    , Component
    , registerAdapter
    , utils
}
