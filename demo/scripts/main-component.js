// get all components
// 'attachTo' element
// fire app initialize

function init() {
    component.attachTo(document);
    component.attachTo('#content-wrapper');

    // app.debug(true);
    app.init();
}