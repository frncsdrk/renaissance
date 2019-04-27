import { Component } from './../../../dist/renaissance'

class BrowserComponent extends Component {
  /**
   * component
   * @constructor
   * @returns {object} this
   */
  constructor() {
    super();
    this.nodes = [];
    return this;
  }
  /**
   * set node
   * @param {object} node
   * @returns {*}
   */
  addNode(node) {
    this.nodes.push(node);
  }
  /**
   * add an event handler on component
   * @param {string} nodeEvent
   * @param {function} callback
   * @returns {*}
   */
  on(nodeEvent, callback) {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].addEventListener(nodeEvent, callback);
    }
  }
  /**
   * expose an event to other components and make it triggerable
   * (for custom events)
   * @param {string} eventName
   * @param {function} callback
   * @returns {*}
   */
  expose(eventName, callback) {
    document.addEventListener(evName, function (e) { cb(e, e.detail); });
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
}

export default BrowserComponent
