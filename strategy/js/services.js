(function(){
	'use strict'

	var serviceId = "myService";

	angular.module('patterns.services').factory(serviceId, [myService]);

	function myService(){
		return {
			create: function(data){

			},
			read: function(id){

			},
			update: function(id, data){

			},
			delete: function(id){

			}
		}
	}
}());