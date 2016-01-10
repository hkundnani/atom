"use strict"

angular.module('atomApp')
.directive('editInPlace', function() {
  return {
    restrict: 'E',
    scope: {
      cardKey: '=',
      card: '=',
      list: '=',
      key: '=',
      value: '=',
      itemClick: '&'
    },
    templateUrl: 'partials/edit-in-place.html',
    link: function(scope, element, attrs) {
      var inputElement;

      element.addClass('edit-in-place');
      scope.editing = false;
      scope.edit = function() {
        inputElement = angular.element(element.children()[1]);
        scope.editing = true;
        element.addClass('active');
        inputElement[0].focus();
      };
      scope.close = function() {
        scope.editing = false;
        element.removeClass('active');
      }
    }
  };
});
