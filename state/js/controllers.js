(function(){
	'use strict';

	

	var Order = function(){
		
		var currentState = undefined;

		this.previousEnabled = false;
		this.nextEnabled = true;
		this.subEnabled = false;

		this.change = function(state){
			currentState = state;
			//currentState.go();
		}

		this.go = function(){
			currentState.go();
		}

		this.subGo = function(){
			if(typeof currentState.subGo === 'function'){
				currentState.subGo();
			}
		}

		this.back = function(){
			currentState.back();
		}

		this.changeToHighlightedState = function(stateId){
			var currentHighlight = jQuery('.active');

			if(typeof currentHighlight !== 'undefined'){
				currentHighlight.removeClass('active');
			}

			jQuery('#' + stateId).addClass('active');
		}

		currentState = new Entry(this);
	}

	var Entry = function(order){
		this.order = order;

		this.order.previousEnabled = false;
		this.order.subEnabled = false;

		this.order.changeToHighlightedState('entry');

		this.go = function(){
			order.change(new Review(order));
		}

		this.back = function(){
			return;
		}
	}

	var Review = function(order){
		this.order = order;

		this.order.previousEnabled = true;
		this.order.subEnabled = true;

		this.order.changeToHighlightedState('review');

		this.go = function(){
			order.change(new Shipped(order));
		}

		this.subGo = function(){
			order.change(new Feedback(order));
		}

		this.back = function(order){
			this.order.change(new Entry(this.order));
		}
	}

	var Feedback = function(order){
		this.order = order;

		this.order.previousEnabled = false;
		this.order.subEnabled = false;

		this.order.changeToHighlightedState('feedback');

		this.go = function(){
			order.change(new Review(order));
		}
	}

	var Shipped = function(order){
		this.order = order;

		this.order.nextEnabled = true;
		this.order.previousEnabled = true;
		this.order.subEnabled = false;

		this.order.changeToHighlightedState('shipped');

		this.go = function(){
			order.change(new Complete(order));
		}

		this.back = function(order){
			this.order.change(new Review(this.order));
		}
	}

	var Complete = function(order){
		this.order = order;

		this.order.previousEnabled = true;
		this.order.nextEnabled = false;
		

		this.order.changeToHighlightedState('complete');

		this.go = function(){
			return;
		}

		this.back = function(order){
			this.order.change(new Shipped(this.order));
		}
	}

	

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "State Pattern";
		vm.order = new Order();

		var _init = function(){
			console.log('State Pattern Initilized');
		}

		_init();

		vm.nextStatus = function(){
			vm.order.go();
		}

		vm.previousStatus = function(){
			vm.order.back();
		}

		vm.subStatus = function(){
			vm.order.subGo();
		}

		vm.manualStatus = function(){
			var status = vm.selectedStatus;

			vm.order.setStatus(status);
		}
	}
}());