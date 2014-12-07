(function(){
	'use strict';

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Mixin Pattern";

		var _init = function(){
			console.log('Mixin Pattern Initilized');
		}

		_init();
	}
}());