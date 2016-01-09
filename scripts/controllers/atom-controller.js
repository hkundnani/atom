"use strict"

angular.module('atomApp')
.controller('atomCtrl', function($scope, atomSvc) {

$scope.listArray = atomSvc.getListArray();
  $scope.createList = function(listName) {
    atomSvc.saveList(listName);
  };

  atomSvc.getList();
});
