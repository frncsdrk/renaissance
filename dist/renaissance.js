"use strict";
// renaissance core
Object.defineProperty(exports, "__esModule", { value: true });
// interface IComponent {
//   init: Function
//   render: Function
// }
var Component = /** @class */ (function () {
    /**
     * component
     * @constructor
     * @returns {object} this
     */
    function Component() {
        // this.beforeMap = {};
        // this.afterMap = {};
        this._events = {};
        this.init && this.after('init', this.init);
        return this;
    }
    Component.prototype.init = function () { };
    /**
     * trigger component event handlers
     * @param {string} event
     * @param {object} data
     */
    Component.prototype.trigger = function (event, data) {
        var beforeArr = this._events['before.' + event];
        var eventArr = this._events[event];
        var afterArr = this._events['after.' + event];
        var triggered = {
            before: false,
            event: false,
            after: false
        };
        if (Array.isArray(beforeArr) && beforeArr.length > 0) {
            for (var i = 0; i < beforeArr.length; i++) {
                beforeArr[i](data);
            }
            triggered.before = true;
        }
        if (Array.isArray(eventArr) && eventArr.length > 0) {
            for (var i = 0; i < eventArr.length; i++) {
                eventArr[i](data);
            }
            triggered.event = true;
        }
        if (Array.isArray(afterArr) && afterArr.length > 0) {
            for (var i = 0; i < afterArr.length; i++) {
                afterArr[i](data);
            }
            triggered.after = true;
        }
        return triggered;
    };
    /**
     * register before event
     * @param {string} event
     * @param {function} callback
     */
    Component.prototype.before = function (event, callback) {
        if (typeof callback !== 'function') {
            return false;
        }
        if (!Array.isArray(this._events['before.' + event])) {
            this._events['before.' + event] = [];
        }
        return this._events['before.' + event].push(callback);
    };
    /**
     * add an event handler on component
     * @param {string} event
     * @param {function} callback
     * @returns {*}
     */
    Component.prototype.on = function (event, callback) {
        if (typeof callback !== 'function') {
            return false;
        }
        if (!Array.isArray(this._events[event])) {
            this._events[event] = [];
        }
        return this._events[event].push(callback);
    };
    /**
     *register after event
     * @param {string} event
     * @param {function} callback
     */
    Component.prototype.after = function (event, callback) {
        if (typeof callback !== 'function') {
            return false;
        }
        if (!Array.isArray(this._events['after.' + event])) {
            this._events['after.' + event] = [];
        }
        return this._events['after.' + event].push(callback);
    };
    /**
     * callback for component instantiation
     */
    Component.prototype.onInit = function () {
        return this.trigger('init', this);
    };
    return Component;
}());
exports.Component = Component;
var Renaissance = /** @class */ (function () {
    function Renaissance() {
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
    Renaissance.prototype.registerAdapter = function (name, Adapter) {
        // if name already defined on this, omit registration
        if (typeof this.adapters[name] !== 'undefined') {
            return false;
        }
        var adapter = new Adapter();
        this.adapters[name] = adapter;
        return adapter;
    };
    ;
    /**
     * register a mixin
     * @param {string} name
     * @param {constructor} Component
     * @param {function} callback
     * @returns {boolean}
     */
    Renaissance.prototype.registerMixin = function (name, Component, callback) {
        // avoid overwriting other functionality
        if (typeof Component.prototype[name] !== 'undefined') {
            return false;
        }
        // register drink on component prototype
        Component.prototype[name] = callback;
        return true;
    };
    ;
    /**
     * register a plugin
     * @param {string} name
     * @param {constructor} Plugin
     * @return {boolean} registered
     */
    Renaissance.prototype.registerPlugin = function (name, Plugin) {
        // if name already defined on this, omit registration
        if (typeof this[name] !== 'undefined') {
            return false;
        }
        // register plugin function on renaissance prototype
        this[name] = new Plugin(this);
        return true;
    };
    ;
    return Renaissance;
}());
exports.Renaissance = Renaissance;
var instance = new Renaissance();
var renaissance = instance;
exports.renaissance = renaissance;
var r = instance;
exports.r = r;
//# sourceMappingURL=renaissance.js.map