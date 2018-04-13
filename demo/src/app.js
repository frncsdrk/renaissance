import 'babel-core/register'
// babel polyfill only one time
// import 'babel-polyfill'
import { r } from './../../dist/renaissance'
import lsa from './adapters/localStorage'
import HelloWorld from './components/HelloWorld'

console.log(r.utils.getNodes('#renaissance'));
lsa.save('foo', 'bar');
console.log(lsa.get('foo'));

const hw = new HelloWorld();
r.utils.attachTo(hw, '#hello-world');
