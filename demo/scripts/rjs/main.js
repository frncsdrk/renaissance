// main rjs component
requirejs.config({
    baseUrl: ''
    , paths: {
        'lib': '../lib'
    }
});

require(
    [
        //
    ]
    , function() {
        require(['scripts/rjs/page'], function(initialize) { // scripts
            initialize();
        });
    }
);
