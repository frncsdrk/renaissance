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
        var self = this;
        // this.$: element reference
        // keyword: after
        this.setMeta({
            // content: self.node.innerHTML
        });

        this.add = function() {};

        this.rename = function() {
            self.node.innerHTML = 'yolo button';
        };

        // keyword: after
        this.after('init', function(component) {
            // keyword: on
            component.on('click', function() {
                console.log('testComponent click');
                // console.log('testComponent meta content:', self.meta.content);
                self.rename();
            });
            console.log('component:', component);
            // component.node.addEventListener('click', function() { console.log('testComponent click'); });
        });

        // return this;
    }
);
