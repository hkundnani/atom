"use strict"

angular.module('atomApp')
.controller('atomCtrl', function($scope, atomSvc, $uibModal) {

  $scope.createList = function(listName) {
    atomSvc.saveList(listName);
  };

  $scope.createCard = function(cardValue, listKey) {
    atomSvc.saveCard(cardValue, listKey);
  };

  $scope.$on('listArray: updated', function(event, listData){
    $scope.listArray = listData;
  });

  $scope.listArray = atomSvc.getList();

  $scope.updateList = function(listName, listKey) {
    atomSvc.updateList(listName, listKey);
  };

  $scope.confirmDeleteList = function(listKey) {
    var cardDetails = {
      listKey: listKey
    },
      modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/deleteWarningList.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          cardDetails: function() {
            return cardDetails;
          }
        }
      });
  };
  $scope.showSearch = function() {
    $scope.searchPanel = true;
  };
  $scope.hideSearch = function() {
    $scope.searchPanel = false;
  };

  $scope.showCardDetails = function(listKey, cardKey, cardValue, listName, cardDescription) {
    $scope.cardDetails = {
      listKey: listKey,
      cardKey: cardKey,
      cardValue: cardValue,
      listName: listName,
      cardDescription: cardDescription
    };
    var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/cardDetails.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          cardDetails: function() {
            return $scope.cardDetails;
          }
        }
    });
  };

  $scope.confirmDeleteCard = function(event, listKey, cardKey) {
    event.stopImmediatePropagation();
    var cardDetails = {
      listKey: listKey,
      cardKey: cardKey
    },
      modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'partials/deleteWarningCard.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        cardDetails: function() {
          return cardDetails;
        }
      }
    });
  };
})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, cardDetails, atomSvc) {

  $scope.cardDetails = cardDetails;

  $scope.cancel = function() {
   $modalInstance.dismiss('cancel');
 };

 $scope.deleteList = function() {
   $modalInstance.close();
   atomSvc.removeList(cardDetails.listKey);
 };

 $scope.deleteCard = function() {
   $modalInstance.close();
   atomSvc.deleteCard(cardDetails);
 };

 $scope.updateCardValue = function(cardValue, listKey, cardKey) {
   atomSvc.updateCardValue(cardValue, listKey, cardKey);
 };

 $scope.updateCardDescription = function(cardDesc, listKey, cardKey) {
   atomSvc.updateCardDescription(cardDesc, listKey, cardKey);
 };
});
