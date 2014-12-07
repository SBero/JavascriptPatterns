(function(){
	'use strict';

	var Strategy = function(){
		this.company = "";
	}

	Strategy.prototype = {
		setStrategy: function(company){
			this.company = company;
		},
		calculate: function(shipment){
			return this.company.calculate(shipment);
		},
		getAvailableStrategies: function(){
			return [FedEx, UPS];
		}
	}

	var FedEx = function(){
		this.name = "FedEx";

		this.calculate = function(shipment){
			var rate = 100;

			if(shipment.pkg_qty < 10){
				rate = rate * 0.8;
			}
			else{
				rate = rate * 0.68;
			}

			if(shipment.weight < 100){
				rate * 0.97;
			}

			return (shipment.distance * rate) / 25;
		}
	};

	var UPS = function(){
		this.name = "UPS";

		this.calculate = function(shipment){
			var rate = 100;

			if(shipment.pkg_qty < 10){
				rate = rate * 0.7;
			}
			else{
				rate = rate * 0.72;
			}

			if(shipment.weight < 100){
				rate * 0.96;
			}

			return (shipment.distance * rate) / 24;
		}
	};

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Strategy Pattern";

		vm.pkg_qty = 5;
		vm.total_weight = 50;
		vm.distance = 500;

		vm.bestStrategy = undefined;
		vm.strategyResults = [];

		var _init = function(){
			console.log('Strategy Pattern Initilized');
		}

		_init();

		vm.runStrategy = function(){
			var shipment = {
				pkg_qty: vm.pkg_qty,
				weight: vm.total_weight,
				distance: vm.distance
			}

			var strategy = new Strategy();

			var strategies = strategy.getAvailableStrategies();

			var bestPrice = undefined;

			vm.strategyResults = [];

			angular.forEach(strategies, function(strat){
				var strategyObj = new strat();

				strategy.setStrategy(strategyObj);

				var strategyResult = strategy.calculate(shipment);

				strategyResult = strategyResult.toFixed(2);

				var strategyDetail = angular.extend({}, shipment, {price: strategyResult, company: strategyObj.name});

				vm.strategyResults.push(strategyDetail);

				if(typeof bestPrice === 'undefined'){
					bestPrice = strategyDetail;
				}
				else{
					if(strategyDetail.price < bestPrice.price){
						bestPrice = strategyDetail;
					}
				}
			});

			vm.bestStrategy = bestPrice;

		}

	}
}());