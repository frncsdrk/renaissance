// hello world plugin
class HelloWorld {
  constructor(context) {
    this.context = context;
    return this;
  }
  /**
   * say hello
   * @return {*}
   */
  hello() {
    console.log('hello plugin');
  }
}

export default HelloWorld
