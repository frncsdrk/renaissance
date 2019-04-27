import { r } from './../../../dist/renaissance'
import BrowserComponent from './BrowserComponent'
import helloMixin from '../mixins/hello-mixin'

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
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].innerHTML = 'hello world';
    }
  }

  init(component) {
    component.render();
  }
}

const registered = r.registerMixin('sayHello', HelloWorld, helloMixin);
console.log('registered mixin:', registered);

export default HelloWorld
