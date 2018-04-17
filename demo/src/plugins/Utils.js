// utils private
class Utils {
    constructor(context) {
        this.context = context;
        return this;
    }
    /**
     * get nodes by selector
     * @param {string} selector
     * @returns {object} NodeList
     */
    getNodes(selector) {
        // try to use query selector all on slctr with attribute
        if (selector.match(/^.+\[.+\]$/)) {
            return document.querySelectorAll(slctr);
        }

        // default - use standard selector statements
        // node
        if (typeof selector === 'object') {
            return [selector];
        }
        // id
        else if (selector.charAt(0) === '#') {
            selector = selector.substring(1);
            return [document.getElementById(selector)];
        }
        // class
        else if (selector.charAt(0) === '.') {
            selector = selector.substring(1);
            return document.getElementsByClassName(selector);
        }
        // tag
        else if (typeof selector === 'string') {
            return document.getElementsByTagName(selector);
        }
    };
    /**
     * attach component to selected elements
     * @param {object} component
     * @param {string} selector
     * @returns {array} components
     */
    attachTo(component, selector) {
        let componentArr = [];
        let nodes = this.getNodes(selector);
        // register a component for every found node
        for (let i = 0; i < nodes.length; i++) {
            this.context.registerComponent(component, nodes[i]); // this.Blueprint
            componentArr.push(component);
        }

        return componentArr;
    };
}

export default Utils