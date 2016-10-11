// main rjs component
requirejs.config({
    baseUrl: ''
    , paths: {}
});

require(
    [
        //
    ]
    , function() {
        require(['scripts/page-rjs'], function(initialize) {
            initialize();
        });
    }
);
