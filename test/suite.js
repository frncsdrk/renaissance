// suite
import renaissance from './../renaissance'

let Suite = () => {
    this.result = {}
    return this
}

Suite.helpers = {}
Suite.helpers.toEqual = (expectedValue, actualValue) => {
    return expectedValue === actualValue
}
Suite.prototype.expect = function(expectedValue) {
    return {
        toEqual: (actualValue) => this.helpers.toEqual(expectedValue, actualValue)
    }
}

Suite.prototype.Spec = function(name, cb) {
    this.name = name
    cb(this) // suite.test
    return this
}

Suite.prototype.Spec.prototype.test = function(name, cb) {
    this.result[this.name + '.' + name] = cb()
}

export default () => {
    renaissance.registerPlugin('suite', Suite)
}