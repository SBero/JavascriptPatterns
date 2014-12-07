(function(){
	'use strict';

	var Product = function(name, price, discount, sale_price){
		var self = this;

		this.accept = function(visitor){
			visitor.visit(self);
		};

		this.getName = function(){
			return name;
		};

		this.getPrice = function(){
			return price;
		}

		this.setDiscount = function(dis){
			discount = dis;
		};

		this.getDiscount = function(){
			return discount;
		};

		this.getDiscountPercentStr = function(){
			if(discount){
				return (discount * 100) + "%";
			}
		}

		this.getDiscountAmount = function(){
			if(discount){
				return (price * self.getDiscount()).toFixed(2);
			}
		}

		this.getSalePrice = function(){
			if(discount){
				return (price * (1 - self.getDiscount())).toFixed(2);
			}
		}
	}

	var Discount = function(){
		this.visit = function(prod){
			prod.setDiscount(0.10);
		}
	}

	var controllerId = "mainCtrl";

	angular.module('patterns.controllers').controller(controllerId, ['$scope', mainCtrl]);

	function mainCtrl($scope){

		var vm = this;
		vm.title = "Visitor Pattern";

		vm.products = [
			new Product('Laptop', 249.99),
			new Product('Desktop', 209.99),
			new Product('Tablet', 229.99)
		];

		console.log(vm.products);

		var _init = function(){
			console.log('Visitor Pattern Initilized');
		}

		_init();

		vm.doDiscount = function(){
			var discount = new Discount();

			angular.forEach(vm.products, function(product){
				product.accept(discount);
			});
		}
	}
}());