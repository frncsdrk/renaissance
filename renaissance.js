// renaissance core

/*
 * function component() {
 *    this.args = {};
 *    
 *    this.add = function() {};
 *    this.rm = function() {};
 *    
 *    this.after('initialize', function() {});
 * }
 */

'use strict';

define(
    []
    , function() {
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
        renaissance.registerComponent = function(component, node) {
            // set node
            component.setNode(node);
            // event handlers
            component.afterMap['init'](component);
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

        // private
        // wrapper for bare component definition
        renaissance.defineComponent = function(Component) {
            return new renaissance.Attachable(Component);
        };
        renaissance.Component = function() {
            this.beforeMap = {};
            this.afterMap = {};

            return this;
        };
        renaissance.Component.prototype.setNode = function(node) {
            this.node = node;
        }
        renaissance.Component.prototype.on = function(nodeEv, cb) {
            this.node.addEventListener(nodeEv, cb);
        };
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
        renaissance.Component.prototype.before = function(ev, cb) {
            if (typeof this.beforeMap !== 'object') this.beforeMap = {};
            this.beforeMap[ev] = cb;
        };
        renaissance.Component.prototype.after = function(ev, cb) {
            if (typeof this.afterMap !== 'object') this.afterMap = {};
            this.afterMap[ev] = cb;
        };
        renaissance.Attachable = function(Blueprint) {
            this.Blueprint = Blueprint;
            this.Blueprint.prototype = renaissance.Component.prototype;

            return this;
        };
        renaissance.Attachable.prototype.attachTo = function(selector) {
            var nodes = renaissance.utils.getNodes(selector);
            // register a component for every found node
            for (var i = 0; i < nodes.length; i++) {
                renaissance.registerComponent(new this.Blueprint(), nodes[i]);
            }
        };

        // logger public

        // debug (depends on logger) public

        // utils private
        renaissance.utils = {};
        // get nodes by selector
        renaissance.utils.getNodes = function(slctr) {
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

        return renaissance;
    }
);
