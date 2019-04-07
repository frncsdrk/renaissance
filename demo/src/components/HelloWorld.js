const { r } = require('../../../dist/renaissance')
const BrowserComponent = require('./BrowserComponent')
const helloMixin = require('../mixins/hello-mixin')

class HelloWorld extends BrowserComponent {
  constructor() {
    super();
    console.log('nodes:', this.nodes);
    this.meta = {
      localStorage: r.adapters.localStorage
    };
    return this;
  }

  render() {
    console.log('HelloWorld component render:', this.nodes)
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].innerHTML = 'hello world';
    }
  }

  init() {
    this.render();
  }
}

const registered = r.registerMixin('sayHello', HelloWorld, helloMixin);
console.log('registered mixin:', registered);

module.exports = HelloWorld
