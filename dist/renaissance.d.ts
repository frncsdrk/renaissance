interface IBaseComponent {
    trigger: Function;
    before: Function;
    on: Function;
    after: Function;
}
declare class Component implements IBaseComponent {
    _events: {
        [key: string]: Function[];
    };
    init(): void;
    /**
     * component
     * @constructor
     * @returns {object} this
     */
    constructor();
    /**
     * trigger component event handlers
     * @param {string} event
     * @param {object} data
     */
    trigger(event: string, data: object): {
        before: boolean;
        event: boolean;
        after: boolean;
    };
    /**
     * register before event
     * @param {string} event
     * @param {function} callback
     */
    before(event: string, callback: Function): number | false;
    /**
     * add an event handler on component
     * @param {string} event
     * @param {function} callback
     * @returns {*}
     */
    on(event: string, callback: Function): number | false;
    /**
     *register after event
     * @param {string} event
     * @param {function} callback
     */
    after(event: string, callback: Function): number | false;
    /**
     * callback for component instantiation
     */
    onInit(): {
        before: boolean;
        event: boolean;
        after: boolean;
    };
}
declare class Renaissance {
    adapters: {
        [key: string]: object;
    };
    [index: string]: object;
    constructor();
    /**
     * register component internally
     * @param {string} name
     * @param {object} Component
     * @returns {object} component
     */
    /**
     * register an Adapter
     * @param {string} name
     * @param {constructor} Adapter
     */
    registerAdapter(name: string, Adapter: any): any;
    /**
     * register a mixin
     * @param {string} name
     * @param {constructor} Component
     * @param {function} callback
     * @returns {boolean}
     */
    registerMixin(name: string, Component: any, callback: Function): boolean;
    /**
     * register a plugin
     * @param {string} name
     * @param {constructor} Plugin
     * @return {boolean} registered
     */
    registerPlugin(name: string, Plugin: any): boolean;
}
declare const renaissance: Renaissance;
declare const r: Renaissance;
export { Renaissance, renaissance, r, Component };
