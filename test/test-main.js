// main
'use strict';

requirejs.config({
    baseUrl: './'
    , paths: {
        'renaissance': '../renaissance'
        , 'mock': 'mock'
        , 'spec': 'spec'
    }
});

require(
    [
        'test-page'
    ]
    , function(initialize) {
        // console.log(initialize);
        initialize();
    }
);
