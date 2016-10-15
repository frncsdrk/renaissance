// core functionality
// TODO: wrap in requirejs for easy template loading or think of other strategy for using templates

// compile components to minified js, add to 'namespace'
// -> could avoid requirejs, webpack, ...
// communication over events

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
    [],
    function() {
        var potion = {};

        // private
        // registry filled and emptied when attaching and unattaching components to DOM
        potion.registry = {};
        potion.components = {};
        potion.adapters = {};
        potion.storage = {};
        potion.template = {};
        potion.drinks = {};
        // private / only available for adapter and drink creators
        potion.registerComponent = function(component, node) {
            // register components event handlers on node
            // potion.registry[component.toString()] = component;

            // instantiation
            // var component = new Component();
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
            // var adapter = new potion.Adapter();
            var adapter = new Adapter();

            extendable[name] = {};

            for (var fn in adapter) {
                extendable[name][fn] = adapter[fn];
            }
            // console.log(adapter);
        };
        potion.registerDrink = function() {};

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
        potion.Component.prototype.setMeta = function(opts) {
            this.meta = opts;
        };
        potion.Component.prototype.setNode = function(node) {
            this.node = node;
        }
        potion.Component.prototype.on = function(nodeEv, cb) {
            // for (var i = 0; i < this.nodes.length; i++) {
                // this.nodes[i].addEventListener(nodeEv, cb);
            // }
            this.node.addEventListener(nodeEv, cb);
        };
        potion.Component.prototype.before = function(ev, cb) {
            if (typeof this.beforeMap !== 'object') this.beforeMap = {};
            this.beforeMap[ev] = cb;
        };
        potion.Component.prototype.after = function(ev, cb) {
            if (typeof this.afterMap !== 'object') this.afterMap = {};
            this.afterMap[ev] = cb;
        };
        // potion.Component.prototype.attachTo = function(selector) {
            //
            // var nodes = potion.utils.getNodes(selector);
            // potion.registerComponent(this, nodes[0]);
        // };
        potion.Attachable = function(Blueprint) {
            this.Blueprint = Blueprint;
            this.Blueprint.prototype = potion.Component.prototype;

            return this;
        };
        potion.Attachable.prototype.attachTo = function(selector) {
            var nodes = potion.utils.getNodes(selector);
            potion.registerComponent(new this.Blueprint(), nodes[0]);
        };

        // adapters
        // internal private
        // potion.Adapter = function() {
            // return this;
        // };
        // interface public

        // logger public

        // debug (depends on logger) public

        // utils private
        potion.utils = {};
        // get nodes by selector
        potion.utils.getNodes = function(slctr) {
            // node
            if (typeof slctr === 'object') {
                return slctr;
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

        // drinks (add functionality to public functions) mixin-like

        // public
        potion.app = function() {
            return this;
        };
        potion.app.prototype.run = function(cb) {
            // run init callback (attaching components to nodes)
            cb();
        };

        return potion;
    }
);
