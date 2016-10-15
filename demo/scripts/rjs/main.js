// main rjs component
requirejs.config({
    baseUrl: './'
    , paths: {
        'text': 'bower_components/text/text'
        , 'lib': '../lib'
        , 'templates': 'templates'
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
