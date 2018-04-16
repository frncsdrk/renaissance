import { r, Component } from './../../../dist/renaissance'
import helloMixin from '../mixins/hello-mixin'

class HelloWorld extends Component {
    constructor() {
        super();
        this.meta = {
            localStorage: r.adapters.localStorage
        };
        return this;
    }

    render() {
        this.node.innerHTML = 'hello world';
    }

    init(component) {
        component.render();
    }
}

const registered = r.registerMixin('sayHello', HelloWorld, helloMixin);
console.log('registered mixin:', registered);

export default HelloWorld
