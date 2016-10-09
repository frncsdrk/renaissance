// get all components
// 'attachTo' element
// fire app initialize

function init() {
    testComponent.attachTo('#test-component-button');
    // potion.attachComponentTo(testComponent, '#test-component-button');
    
    testComponent.attachTo('.button2');
    // potion.attachComponentTo(testComponent, '.button2');

    // app.debug(true);
    // app.init();
}

init();
