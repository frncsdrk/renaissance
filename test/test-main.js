// main
'use strict';

/*
requirejs.config({
    baseUrl: './'
    , paths: {
        'node_modules': '../node_modules'
        
        , 'renaissance': '../renaissance'
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
*/

import renaissance from './../renaissance'
import suite from './suite'
import renaissanceSpec from './spec/renaissance.spec'

suite()
