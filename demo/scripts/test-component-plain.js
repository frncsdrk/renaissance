// plain test component

/*
var component = new Component();

component.add = function() {};

component.after('initialize', function() {
    // ...
});
*/

/////////////////////////////////////////////

var testComponent = potion.defineComponent(
    function testComponent() {
        // this.$: element reference
        // keyword: after
        this.setMeta({});

        this.add = function() {};

        // keyword: after
        // var self = this;
        this.after('init', function(component) {
            // keyword: on
            component.on('click', function() { console.log('testComponent click'); });
            console.log('component:', component);
            // component.node.addEventListener('click', function() { console.log('testComponent click'); });
        });

        // return this;
    }
)
