const { r } = require('../../dist/renaissance')
const Utils = require('./plugins/Utils')
const LocalStorage = require('./adapters/LocalStorage')
const HelloWorld = require('./components/HelloWorld')
const HelloWorldPlugin = require('./plugins/hello-plugin')

const utilsPlugin = r.registerPlugin('utils', Utils);
const helloPlugin = r.registerPlugin('hello', HelloWorldPlugin);
const lsa = r.registerAdapter('localStorage', LocalStorage);

// plugin
r.hello.hello();

// adapter
console.log(r.utils.getNodes('#renaissance'));
lsa.save('foo', 'bar');
console.log(lsa.get('foo'));

// component
const hw = new HelloWorld();
// on
hw.on('sayhello', () => {
    // mixin
    hw.sayHello();
})
// expose
hw.expose('trigger', () => {
    console.log('hello trigger')
})
r.utils.attachTo(hw, '#hello-world');

hw.trigger('sayhello')
hw.triggerExposed('trigger')
