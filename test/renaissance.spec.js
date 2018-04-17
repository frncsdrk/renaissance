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

class InitComponent extends Component {
    constructor() {
        super();
        return this;
    }

    init() {
        return true;
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

test('attempt to double register a plugin name', (t) => {
    t.notOk(r.registerPlugin('meta', TestPlugin));
    t.end();
});

test('register an adapter', (t) => {
    t.ok(r.registerAdapter('test', TestAdapter));
    t.ok(typeof r.adapters.test === 'object');
    t.end();
});

test('attempt to double register an adapter name', (t) => {
    t.notOk(r.registerAdapter('test', TestAdapter));
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

test('attempt to double register a mixin name on a component', (t) => {
    t.notOk(r.registerMixin('test', TestComponent, mixin));
    t.end();
});

test('r.Component can be constructed', (t) => {
    t.ok(new Component());
    t.end();
});

test('r.Component.before', (t) => {
    const component = new Component();
    component.before('foo', () => {});
    t.ok(typeof component.beforeMap['foo'] === 'function');
    t.end();
});

test('r.Component.after', (t) => {
    const component = new Component();
    component.after('foo', () => {});
    t.ok(typeof component.afterMap['foo'] === 'function');
    t.end();
});

test('r.Component init defined in class', (t) => {
    let component = new InitComponent();
    t.ok(component.init());
    t.end();
});

test('r.Component.onInit - init defined afterwards', (t) => {
    let component = new Component();
    component.after('init', (component) => { component.foo = 'bar'; });
    t.ok(typeof component.onInit === 'function');
    component.onInit();
    t.equal(component.foo, 'bar');
    t.end();
});
