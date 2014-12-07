(function(){
	'use strict'

	var directiveId = "myDirective";

	angular.module('patterns.directives').directive(directiveId, [myDirective]);

	function myDirective(){
		return {
			template: ""
		}
	}
}());