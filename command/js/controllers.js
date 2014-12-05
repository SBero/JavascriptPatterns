(function(){
	'use strict';

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){
		/*
		Main controller setup and initializion
		 */
		var vm = this;
		vm.title = "Command Pattern";

		vm.itemsArr = [];
		vm.itemsAvailable = [
			{label: 'New York', value: 'ny'},
			{label: 'California', value: 'ca'},
			{label: 'Colorado', value: 'co'}
		];
		vm.itemToAdd = vm.itemsAvailable[0]; // default selection

		vm.undoCommands = [];
		vm.redoCommands = [];

		vm.undoEnabled = false;
		vm.redoEnabled = false;

		var _init = function(){
			console.log('Command Pattern Initilized');
		}

		_init();

		/*
		The basis for the Command Pattern
		 */
		var Command = function(execute, undo, value){
			this.execute = execute;
			this.undo = undo;
			this.value = value;
		};

		vm.AddItemCommand = function(){
			var item = angular.extend({}, vm.itemToAdd);

			vm.redoCommands = [];

			return new Command(addItem, deleteItem, item);
		};

		vm.DeleteItemCommand = function(item){
			return new Command(deleteItem, addItem, item);
		};


		/*
		Helper function to toggle the state of the undo/redo buttons.
		 */
		var setUndoRedoEnables = function(){
			if(vm.redoCommands.length > 0){
				vm.redoEnabled = true;
			}
			else{
				vm.redoEnabled = false;
			}

			if(vm.undoCommands.length > 0){
				vm.undoEnabled = true;
			}
			else{
				vm.undoEnabled = false;
			}
		}

		/*
		Application button click functions for utilizing the Command Pattern.
		 */
		vm.execute = function(command){
			command = new command;

			vm.undoCommands.push(command);
			command.execute(command.value);
			
		}

		vm.undo = function(){
			if(vm.undoCommands.length > 0){
				var command = vm.undoCommands.pop();

				vm.redoCommands.push(command);
				command.undo(command.value);
			}
		}

		vm.redo = function(){
			if(vm.redoCommands.length > 0){
				var command = vm.redoCommands.pop();

				vm.undoCommands.push(command);
				command.execute(command.value);
			}
		}

		/*
		Functions which will be encapsulated by the Command Pattern.

		In essence, these functions do the inverse of each other.
		 */
		var sequenceId = 0; // used to create a unique key for each item, not using item.$hashKey for user clarity

		var addItem = function(item){
			if(typeof item.id === 'undefined'){
				item.id = sequenceId;
				sequenceId++;
			}
			
			vm.itemsArr.push(item);

			setUndoRedoEnables();
		}

		var deleteItem = function(item){
			for(var i = 0; i < vm.itemsArr.length; ++i){
				if(item.id === vm.itemsArr[i].id){
					var itemRemoved = vm.itemsArr.splice(i, 1);
					setUndoRedoEnables();
					return;
				}
			}

			
		}

	}
}());