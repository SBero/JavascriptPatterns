(function(){
	'use strict';

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Strategy Pattern";

		var _init = function(){
			console.log('Strategy Pattern Initilized');
		}

		_init();
	}
}());