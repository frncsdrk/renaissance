// renaissance spec
/*
define(
	[
		'renaissance'

		, 'mock/component_without_init.mock'
	]
	, function(
		renaissance

		, componentWithoutInit
	) {
		function spec(renaissance) {
			return renaissance.suite('renaissance', function(test) {
				test(
					'renaissance utils getNodes by tagname'
					, function() {
						return renaissance.utils.getNodes('body')[0].tagName.toLowerCase();
					}
					, 'equal'
					, 'body'
				);

				test(
					'renaissance utils getNodes querySelectorAll'
					, function() {
						var node = renaissance.utils.getNodes('script[type="text/javascript"]')[0];
						console.log(node.tagName.toLowerCase(), node.getAttribute('type'));
						return node.tagName.toLowerCase() === 'script' && node.getAttribute('type') === 'text/javascript';
					}
					, 'equal'
					, true
				);

				var componentArr = componentWithoutInit.attachTo('body');
				componentWithoutInitCompo = componentArr[0];
				test(
					'renaissance - component without init works'
					, function() {
						console.log(componentWithoutInitCompo);
						componentWithoutInitCompo.setData();
						if (document.body.getAttribute('data-test') === 'test') {
							componentWithoutInitCompo.removeData();
							return true;
						}
						componentWithoutInitCompo.removeData();
						return false;
					}
					, 'equal'
					, true
				);
			});
		}

		return spec;
	}
);
*/