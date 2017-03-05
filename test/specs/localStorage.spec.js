// local storage spec
define(
    [
        'renaissance'
    ]
    , function(renaissance) {
        function spec(ls) {
            renaissance.test(
                {}
                , function(env) {
                    return ls.get('key');
                }
                , 'equal'
                , null
            );
        }

        return spec;
    }
);
