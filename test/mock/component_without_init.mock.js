// component without init
'use strict';

define(
	[
		'renaissance'
	]
	, function(
		renaissance
	) {
		function component() {
			var self = this;

			this.setData = function() {
				this.node.setAttribute('data-test', 'test');
			};
			this.removeData = function() {
				this.node.removeAttribute('data-test');
			};
		}

		return renaissance.defineComponent(component);
	}
);