// local storage spec
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
            });
        }

        return spec;
    }
);
