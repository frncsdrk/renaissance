import test from 'tape'
import { Renaissance, r, Component } from './../src/renaissance'

class TestPlugin {
    constructor(context) {
        this.context = context;
        this.meta = {};
        return this;
    }

    getMeta() {
        return this.meta;
    }
}

class TestAdapter {
    constructor() {
        return this;
    }
}

class TestComponent extends Component {
    constructor() {
        super();
        return this;
    }
}

const mixin = () => {
    return true;
};

test('Renaissance can be constructed', (t) => {
    t.ok(new Renaissance());
    t.end();
});

test('renaissance is ok', (t) => {
    t.ok(r);
    t.end();
});

test('register a plugin', (t) => {
    t.ok(r.registerPlugin('meta', TestPlugin));
    t.ok(r.meta);
    t.ok(typeof r.meta.getMeta() === 'object');
    t.end();
});

test('register an adapter', (t) => {
    t.ok(r.registerAdapter('test', TestAdapter));
    t.ok(typeof r.adapters.test === 'object');
    t.end();
});

test('register a mixin on a component', (t) => {
    t.ok(r.registerMixin('test', TestComponent, mixin));
    const component = new TestComponent();
    t.ok(typeof component.test === 'function');
    const component2 = new TestComponent();
    t.ok(typeof component2.test === 'function');
    t.end();
});

test('r.Component can be constructed', (t) => {
    t.ok(new Component());
    t.end();
});
