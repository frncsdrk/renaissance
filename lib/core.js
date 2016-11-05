// potion core

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
        var potion = {};

        // private
        // registry filled and emptied when attaching and unattaching components to DOM
        // potion.registry = {};
        // potion.components = {};
        potion.adapters = {};
        potion.storage = {};
        potion.template = {};
        potion.drinks = {};
        // private / only available for adapter and drink creators
        potion.registerComponent = function(component, node) {
            // set node
            component.setNode(node);
            // event handlers
            component.afterMap['init'](component);
        };
        /**
         * register a Adapter
         * @param {object} potion extendable
         * @param {string} adapter name
         * @param {object} adapter constructor
         */
        potion.registerAdapter = function(extendable, name, Adapter) {
            var adapter = new Adapter();

            extendable[name] = {};

            for (var fn in adapter) {
                extendable[name][fn] = adapter[fn];
            }
        };
        /**
         * register a drink, same as a mixin
         * @param {string} name
         * @param {function} callback
         * @returns {boolean}
         */
        potion.registerDrink = function(name, cb) {
            // avoid overwriting other functionality
            if (typeof potion.Component.prototype[name] !== 'undefined') {
                return false;
            }

            // register drink on component prototype
            potion.Component.prototype[name] = cb;

            return true;
        };

        // private
        // wrapper for bare component definition
        potion.defineComponent = function(Component) {
            return new potion.Attachable(Component);
        };
        potion.Component = function() {
            this.beforeMap = {};
            this.afterMap = {};

            return this;
        };
        potion.Component.prototype.setNode = function(node) {
            this.node = node;
        }
        potion.Component.prototype.on = function(nodeEv, cb) {
            this.node.addEventListener(nodeEv, cb);
        };
        potion.Component.prototype.expose = function(evName, cb) {
            document.addEventListener(evName, function(e) { cb(e, e.detail); });
        };
        // trigger exposed events
        /**
         * trigger exposed event
         * @param {string} event name
         * @param {object} event data
         * @returns {*}
         */
        potion.Component.prototype.trigger = function(evName, evData) {
            // console.log('evData:', evData);
            var ev = new CustomEvent(evName, { detail: evData });
            document.dispatchEvent(ev);
        };
        potion.Component.prototype.before = function(ev, cb) {
            if (typeof this.beforeMap !== 'object') this.beforeMap = {};
            this.beforeMap[ev] = cb;
        };
        potion.Component.prototype.after = function(ev, cb) {
            if (typeof this.afterMap !== 'object') this.afterMap = {};
            this.afterMap[ev] = cb;
        };
        potion.Attachable = function(Blueprint) {
            this.Blueprint = Blueprint;
            this.Blueprint.prototype = potion.Component.prototype;

            return this;
        };
        potion.Attachable.prototype.attachTo = function(selector) {
            var nodes = potion.utils.getNodes(selector);
            // register a component for every found node
            for (var i = 0; i < nodes.length; i++) {
                potion.registerComponent(new this.Blueprint(), nodes[i]);
            }
        };

        // logger public

        // debug (depends on logger) public

        // utils private
        potion.utils = {};
        // get nodes by selector
        potion.utils.getNodes = function(slctr) {
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

        return potion;
    }
);
