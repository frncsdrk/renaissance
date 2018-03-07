// local storage spec
/*
define(
    [
        'renaissance'
    ]
    , function(renaissance) {
        function spec(ls) {
            return renaissance.suite('ls', function(test) {
                test(
                    'localStorage.get'
                    , function() {
                        return ls.get('key');
                    }
                    , 'equal'
                    , null
                );

                test(
                    'localStorage.set'
                    , function() {
                        return ls.save('key', 'value');
                    }
                    , 'equal'
                    , true
                );

                test(
                    'localStorage.update'
                    , function() {
                        return ls.update('key', 'value');
                    }
                    , 'equal'
                    , true
                );

                test(
                    'localStorage.update non existent item'
                    , function() {
                        return ls.update('not', 'value');
                    }
                    , 'equal'
                    , false
                );

                test(
                    'localStorage.remove'
                    , function() {
                        return ls.remove('key');
                    }
                    , 'equal'
                    , true
                );

                test(
                    'localStorage.clear'
                    , function() {
                        return ls.clear();
                    }
                    , 'equal'
                    , true
                );

                // prevent next test from failing because of unprepared test environment
                localStorage.clear();
            });
        }

        return spec;
    }
);
*/
