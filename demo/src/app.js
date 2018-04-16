import 'babel-core/register'
// babel polyfill only one time
// import 'babel-polyfill'
import { r } from './../../dist/renaissance'
import LocalStorage from './adapters/LocalStorage'
import HelloWorld from './components/HelloWorld'
import HelloWorldPlugin from './plugins/hello-plugin'

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
