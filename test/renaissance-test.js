// test
define(
    [
        'renaissance'
    ]
    , function(renaissance) {
        /**
         * test
         * @param {object} env
         * @param {function} cb
         * @param {string} verb
         * @param {*} expected result
         * @returns {boolean}
         */
        function test(env, cb, verb, expectedResult) {
            var res = cb(env);

            function shouldEqual(res, should) {
                if (res == should) {
                    return true;
                }
                return false;
            }

            switch (verb) {
                case 'equal':
                    return shouldEqual(res, expectedResult);
                    break;
                default:
                    break;
            }
        }

        return function() {
            renaissance.registerPlugin('test', test);
        };
    }
);
