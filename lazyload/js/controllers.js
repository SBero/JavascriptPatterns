(function(){
	'use strict';

	var User = function(id, name){

		var departments = [
			"Accounting",
			"IT",
			"Executive",
			"Marketing"
		]

		return {
			id: id,
			name: name,
			ghost: true,

			getDepartment: function(){
				if (this.ghost) this.load();
				return this.department;
			},

			load: function(){

				// this is where an ajax call would be placed.
				
				var random = Math.floor(Math.random() * 3);

				this.department = departments[random];

				this.ghost = false;
			}
		}
		

	}

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Lazy Load Pattern";

		vm.users = [
			new User(0, "John Doe"),
			new User(1, "Jane Doe")
		];

		var _init = function(){
			console.log('Lazy Load Pattern Initilized');
		}

		_init();

		vm.load = function(user){
			user.getDepartment();
		}
	}
}());