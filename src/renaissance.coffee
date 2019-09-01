# renaissance core
class Component
  ###
  component
  @constructor
  @returns {object} this
  ###
  constructor: () ->
    this._events = {}

    # to be defined in component extending class
    this.after('init', this.init)
    this.onInit()

    this

  ###
  trigger component event handlers
  @param {string} event
  @param {object} data
  ###
  trigger: (event, data) ->
    beforeArr = this._events['before.' + event]
    eventArr = this._events[event]
    afterArr = this._events['after.' + event]
    triggered =
      before: false
      event: false
      after: false

    if Array.isArray(beforeArr) and beforeArr.length > 0
      # runBefore = (fn) -> fn(data)
      # (fn) -> fn(data) for fn in beforeArr
      for fn in beforeArr
        do (fn) ->
          fn(data)
      # for (let i = 0; i < beforeArr.length; i++) {
      #   beforeArr[i](data)
      # }
      triggered.before = true

    if Array.isArray(eventArr) and eventArr.length > 0
      # (fn) -> fn(data) for fn in eventArr
      for fn in eventArr
        do (fn) ->
          fn(data)
      # for (let i = 0; i < eventArr.length; i++) {
      #   eventArr[i](data)
      # }
      triggered.event = true

    if Array.isArray(afterArr) and afterArr.length > 0
      for fn in afterArr
        do (fn) ->
          fn(data)
      # for (let i = 0; i < afterArr.length; i++) {
      #   afterArr[i](data)
      # }
      triggered.after = true

    triggered

  ###
  register before event
  @param {string} event
  @param {function} callback
  ###
  before: (event, callback) ->
    return false if typeof callback isnt 'function'

    if not Array.isArray(this._events['before.' + event])
      this._events['before.' + event] = []

    this._events['before.' + event].push(callback)

  ###
  add an event handler on component
  @param {string} event
  @param {function} callback
  @returns {*}
  ###
  on: (event, callback) ->
    return false if typeof callback isnt 'function'

    if not Array.isArray(this._events[event])
      this._events[event] = []

    this._events[event].push(callback)

  ###
  register after event
  @param {string} event
  @param {function} callback
  ###
  after: (event, callback) ->
    return false if typeof callback isnt 'function'

    if not Array.isArray(this._events['after.' + event])
      this._events['after.' + event] = []

    this._events['after.' + event].push(callback)

  ###
  callback for component instantiation
  ###
  onInit: () ->
    this.trigger('init', this)

class Renaissance
  constructor: () ->
    # private
    # registry filled and emptied when attaching and unattaching components to DOM
    # renaissance.registry = {};
    # renaissance.components = {};
    this.adapters = {}

    this

  # private / only available for adapter and drink creators
  ###
  register component internally
  @param {string} name
  @param {object} Component
  @returns {object} component
  ###
  ###
  registerComponent(name, Component) {
      this.components[name] = Component;
      // event handlers
      if (typeof component.afterMap['init'] === 'function') {
          component.afterMap['init'](component);
      }

      return component;
  };
  ###
  ###
  register an Adapter
  @param {string} name
  @param {constructor} Adapter
  ###
  registerAdapter: (name, Adapter) ->
    # if name already defined on this, omit registration
    return if typeof this.adapters[name] isnt 'undefined'
      false

    adapter = new Adapter()
    this.adapters[name] = adapter
    adapter

  ###
  register a mixin
  @param {string} name
  @param {constructor} Component
  @param {function} callback
  @returns {boolean}
  ###
  registerMixin: (name, Component, callback) ->
    # avoid overwriting other functionality
    return if typeof Component.prototype[name] isnt 'undefined'
      false

    # register drink on component prototype
    Component.prototype[name] = callback

    true

  ###
  register a plugin
  @param {string} name
  @param {constructor} Plugin
  @return {boolean} registered
  ###
  registerPlugin: (name, Plugin) ->
    # if name already defined on this, omit registration
    return if typeof this[name] isnt 'undefined'
      false

    # register plugin function on renaissance prototype
    this[name] = new Plugin(this)

    true

instance = new Renaissance()
renaissance = instance
r = instance

module.exports = {
  Renaissance
  , renaissance
  , r
  , Component
}
