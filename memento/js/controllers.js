(function(){
	'use strict';

	/*
	User objects for the memento
	 */
	var User = function(name, age){
		this.name = name;
		this.age = age;
	}

	/*
	Adding the memento option to all User objects
	 */
	User.prototype = {
		memento: null,

		hydrate: function(){
			this.memento = JSON.stringify(this);
		},
		dehydrate: function (){
			if(this.memento){
				var m = JSON.parse(this.memento);

				for (var prop in m){
					this[prop] = m[prop];	
				}

				this.memento = null;
			}
		}
	}

	/*
	Standard Angular
	 */
	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Memento Pattern";

		vm.users = [];

		var _init = function(){
			console.log('Memento Pattern Initilized');

			var john = new User("John Doe", 39);
			var jane = new User("Jane Doe", 35);
			var jack = new User("Jack Doe", 31);

			vm.users.push(john);
			vm.users.push(jane);
			vm.users.push(jack);

			// Set the intial, default state
			john.hydrate();
			jane.hydrate();
			jack.hydrate();

		}

		_init();

		// Helper functions
		vm.randomAge = function(user){
			var randomAge = Math.floor((Math.random() * 50) + 20);

			user.age = randomAge;
		}

		vm.setState = function(user){
			user.hydrate();
		}

		vm.restoreState = function(user){
			user.dehydrate();
		}


	}
}());