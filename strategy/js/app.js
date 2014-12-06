(function(){
	'use strict'

	angular.module('patterns.services', []);
	angular.module('patterns.directives', []);
	angular.module('patterns.controllers', []);

	angular.module('patterns', ['patterns.services','patterns.directives','patterns.controllers']);
}());