// test
define(
    [
        'renaissance'
    ]
    , function(renaissance) {
        /**
         * suite
         * @param {string} name
         * @param {function} cb
         * @returns {object} results
         */
        function suite(name, cb) {
            var self = this;
            var result = {};
            result.name = name;
            result.tests = [];

            /**
             * test
             * @param {string} name
             * @param {function} cb
             * @param {string} verb
             * @param {*} expected result
             * @returns {boolean}
             */
            function test(name, cb, verb, expectedResult) {
                var testResult = {
                    name: name
                    , cb: cb
                    , verb: verb
                    , expectedResult: expectedResult
                };

                var res = cb();

                function shouldEqual(res, should) {
                    if (res == should) {
                        return true;
                    }
                    return false;
                }

                function shouldNot() {
                    if (res != should) {
                        return true;
                    }
                    return false;
                }

                function shouldTypeOf(res, should) {
                    if (typeof res === should) {
                        return true;
                    }
                    return false;
                }

                switch (verb) {
                    case 'equal':
                        // return shouldEqual(res, expectedResult);
                        testResult.result = shouldEqual(res, expectedResult);
                        break;
                    case 'not':
                        testResult.result = shouldNot(res, expectedResult);
                        break;
                    case 'typeof':
                        // return shouldTypeOf(res, expectedResult);
                        testResult.result = shouldTypeOf(res, expectedResult);
                        break;
                    default:
                        testResult.result = false;
                        break;
                }

                result.tests.push(testResult);
                // return testResult;
                return true;
            }

            cb(test);

            return result;
        }

        return function() {
            renaissance.registerPlugin('suite', suite);
        };
    }
);
