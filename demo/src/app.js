// import 'babel-core/register'
// babel polyfill only one time
// import 'babel-polyfill'
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
// mixin
hw.sayHello();
r.utils.attachTo(hw, '#hello-world');
