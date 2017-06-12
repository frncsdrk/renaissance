// renaissance spec
define(
	[
		'renaissance'
	]
	, function(
		renaissance
	)
	{
		function spec(renaissance) {
			return renaissance.suite('renaissance', function(test) {
				test(
					'renaissance utils getNodes class tagName'
					, function() {
						// console.log(renaissance.utils.getNodes('.suite-container')[0]);
						// return renaissance.utils.getNodes('suite-container')[0].tagName;
					}
					, 'equal'
					, 'div'
				);
			});
		}

		return spec;
	}
);