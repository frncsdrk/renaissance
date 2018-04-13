// renaissance core
'use strict';
import 'babel-core/register'
// import 'babel-polyfill'
import Utils from './plugins/Utils'

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

class Renaissance {
    constructor() {
        // private
        // registry filled and emptied when attaching and unattaching components to DOM
        // renaissance.registry = {};
        // renaissance.components = {};
        this.adapters = {};
        this.storage = {};
        this.template = {};
        this.drinks = {};

        return this;
    }
    // private / only available for adapter and drink creators
    /**
     * register component internally
     * @param {object} component
     * @param {object} node
     * @returns {object} component
     */
    registerComponent(component, node) {
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
    registerAdapter(name, Adapter) {
        let adapter = new Adapter();
        this.adapters[name] = adapter;
        return adapter;
    };
    /**
     * register a drink, same as a mixin
     * @param {string} name
     * @param {function} callback
     * @returns {boolean}
     */
    /*
    renaissance.registerDrink = function(name, callback) {
        // avoid overwriting other functionality
        if (typeof renaissance.Component.prototype[name] !== 'undefined') {
            return false;
        }

        // register drink on component prototype
        renaissance.Component.prototype[name] = callback;

        return true;
    };
    */
    /**
     * register a plugin
     * @param {string} name
     * @param {function} Plugin
     * @return {boolean} registered
     */
    registerPlugin(name, Plugin) {
        // if name already defined on prototype, omit registration
        if (typeof this[name] !== 'undefined') {
            return false;
        }

        // register plugin function on renaissance prototype
        this[name] = new Plugin(this);

        return false;
    };
}

const instance = new Renaissance();
const renaissance = instance;
const r = instance;
// const registerAdapter = renaissance.registerAdapter;
// const registerPlugin = renaissance.registerPlugin;
renaissance.registerPlugin('utils', Utils);
// const utils = renaissance.utils;

export {
    Renaissance
    , renaissance
    , r
    , Component
    // , registerAdapter
    // , utils
}
