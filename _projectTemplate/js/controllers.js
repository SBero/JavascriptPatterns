(function(){
	'use strict';

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Main Controller";

		var _init = function(){
			console.log('Main Controller Initilized');
		}

		_init();
	}
}());