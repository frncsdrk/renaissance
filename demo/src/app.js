import 'babel-core/register'
// babel polyfill only one time
// import 'babel-polyfill'
import { r, utils } from './../../dist/renaissance.min'
import lsa from './adapters/localStorage'

console.log(utils.getNodes('#renaissance'));
lsa.save('foo', 'bar');
console.log(lsa.get('foo'));
