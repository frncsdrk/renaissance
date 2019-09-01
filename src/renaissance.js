// renaissance core
class Component {
  /**
   * component
   * @constructor
   * @returns {object} this
   */
  constructor() {
    this._events = {};

    this.after('init', this.init);
    this.onInit();

    return this;
  }

  /**
   * trigger component event handlers
   * @param {string} event
   * @param {object} data
   */
  trigger(event, data) {
    let beforeArr = this._events['before.' + event];
    let eventArr = this._events[event];
    let afterArr = this._events['after.' + event];
    let triggered = {
      before: false,
      event: false,
      after: false
    };
    if (Array.isArray(beforeArr) && beforeArr.length > 0) {
      for (let i = 0; i < beforeArr.length; i++) {
        beforeArr[i](data);
      }
      triggered.before = true;
    }
    if (Array.isArray(eventArr) && eventArr.length > 0) {
      for (let i = 0; i < eventArr.length; i++) {
        eventArr[i](data);
      }
      triggered.event = true;
    }
    if (Array.isArray(afterArr) && afterArr.length > 0) {
      for (let i = 0; i < afterArr.length; i++) {
        afterArr[i](data);
      }
      triggered.after = true;
    }
    return triggered;
  }
  /**
   * register before event
   * @param {string} event
   * @param {function} callback
   */
  before(event, callback) {
    if (typeof callback !== 'function') {
      return false;
    }
    if (!Array.isArray(this._events['before.' + event])) {
      this._events['before.' + event] = [];
    }
    return this._events['before.' + event].push(callback);
  }
  /**
   * add an event handler on component
   * @param {string} event
   * @param {function} callback
   * @returns {*}
   */
  on(event, callback) {
    if (typeof callback !== 'function') {
      return false;
    }
    if (!Array.isArray(this._events[event])) {
      this._events[event] = [];
    }
    return this._events[event].push(callback);
  }
  /**
   *register after event
   * @param {string} event
   * @param {function} callback
   */
  after(event, callback) {
    if (typeof callback !== 'function') {
      return false;
    }
    if (!Array.isArray(this._events['after.' + event])) {
      this._events['after.' + event] = [];
    }
    return this._events['after.' + event].push(callback);
  }
  /**
   * callback for component instantiation
   */
  onInit() {
    return this.trigger('init', this);
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
