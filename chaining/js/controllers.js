(function(){
	'use strict';

	function Calculator(start){
		var total = start || 0;

		this.add = function(x) { total += x; return this;}
		this.sub = function(x) { total -= x; return this;}
		this.mul = function(x) { total *= x; return this;}
		this.div = function(x) { total /= x; return this;}

		this.get = function() { return total; }
	}

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Chaining Pattern";
		vm.result = 0;

		var _init = function(){
			console.log('Chaining Pattern Initilized');
		}

		_init();

		vm.process = function(){
			var calculator = new Calculator(5).add(2).mul(5).sub(7);

			vm.result = calculator.get();
		}
	}
}());