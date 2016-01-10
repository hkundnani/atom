"use strict"

angular.module('atomApp')
.directive('closeSearch', ['$document', function($document) {
  return {
    restrict: 'A',
    scope: {
      value: '&'
    },
    link: function(scope) {
      $document.on('click', function(event) {
        scope.$apply(function() {
          scope.value();
        });
        return $document.off('click', event);
      });
    }
  };
}]);
