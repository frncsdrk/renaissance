// plain test component

var component = new Component();

component.add = function() {};

component.after('initialize', function() {
    // ...
});

/////////////////////////////////////////////

function testComponent() {
    // this.$: element reference
    // keyword: after
    this.meta = {};

    this.add = function() {};

    // keyword: after
    this.after('initialize', function() {
        // keyword: on
        this.on();
    });

    return this;
}