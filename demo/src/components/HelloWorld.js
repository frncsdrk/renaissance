import { r, Component } from './../../../dist/renaissance'

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

export default HelloWorld