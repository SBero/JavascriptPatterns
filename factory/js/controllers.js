(function(){
	'use strict';

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Factory Pattern";

		vm.vehicles = [
			{value: 'car', label: "Car"},
			{value: 'bus', label: "Bus"},
			{value: 'taxi', label: "Taxi"}
		];

		vm.vehicleSelected = vm.vehicles[0].value;

		vm.carArr = [];
		vm.busArr = [];
		vm.taxiArr = [];

		var Car = function(){
			this.mpg = 20;
		}

		var Bus = function(){
			this.mpg = 10;
		}

		var Taxi = function(){
			this.mpg = 15;
		}

		vm.createVehicle = function(type){
			var vehicle;

			if(type === "car"){
				vehicle = new Car();
			}
			else if(type === "bus"){
				vehicle = new Bus();
			}
			else if(type === "taxi"){
				vehicle = new Taxi();
			}

			vehicle.type = type;

			vm[type + "Arr"].push(vehicle);
		}



		var _init = function(){
			console.log('Factory Pattern Initilized');
		}

		_init();

		vm.create = function(){
			vm.createVehicle(vm.vehicleSelected);
		}

		vm.remove = function(vehicle){
			var hashKey = vehicle.$$hashKey;
			var type = vehicle.type;
			var arr = vm[type + "Arr"];

			for(var i = 0; i < arr.length; ++i){
				if(arr[i].$$hashKey === hashKey){
					var removedItem = arr.splice(i, 1);
					return;
				}
			}

		}
	}
}());