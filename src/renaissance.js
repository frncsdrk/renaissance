// renaissance core
'use strict';
import 'babel-core/register'
// import 'babel-polyfill'

class Component {
    /**
     * component
     * @constructor
     * @returns {object} this
     */
    constructor() {
        this.beforeMap = {};
        this.afterMap = {};

        this.init && this.after('init', this.init);

        return this;
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
    /**
     * callback for component instantiation
     */
    onInit() {
        this.afterMap['init'] && this.afterMap['init'](this);
    }
}

class Renaissance {
    constructor() {
        // private
        // registry filled and emptied when attaching and unattaching components to DOM
        // renaissance.registry = {};
        // renaissance.components = {};
        this.adapters = {};

        return this;
    }
    // private / only available for adapter and drink creators
    /**
     * register component internally
     * @param {string} name
     * @param {object} Component
     * @returns {object} component
     */
    /*
    registerComponent(name, Component) {
        this.components[name] = Component;
        // event handlers
        if (typeof component.afterMap['init'] === 'function') {
            component.afterMap['init'](component);
        }

        return component;
    };
    */
    /**
     * register an Adapter
     * @param {string} name
     * @param {constructor} Adapter
     */
    registerAdapter(name, Adapter) {
        // if name already defined on this, omit registration
        if (typeof this.adapters[name] !== 'undefined') {
            return false;
        }

        let adapter = new Adapter();
        this.adapters[name] = adapter;
        return adapter;
    };
    /**
     * register a mixin
     * @param {string} name
     * @param {constructor} Component
     * @param {function} callback
     * @returns {boolean}
     */
    registerMixin(name, Component, callback) {
        // avoid overwriting other functionality
        if (typeof Component.prototype[name] !== 'undefined') {
            return false;
        }

        // register drink on component prototype
        Component.prototype[name] = callback;

        return true;
    };
    /**
     * register a plugin
     * @param {string} name
     * @param {constructor} Plugin
     * @return {boolean} registered
     */
    registerPlugin(name, Plugin) {
        // if name already defined on this, omit registration
        if (typeof this[name] !== 'undefined') {
            return false;
        }

        // register plugin function on renaissance prototype
        this[name] = new Plugin(this);

        return true;
    };
}

const instance = new Renaissance();
const renaissance = instance;
const r = instance;

export {
    Renaissance
    , renaissance
    , r
    , Component
}
