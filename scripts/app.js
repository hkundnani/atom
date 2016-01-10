angular.module('atomApp', ['monospaced.elastic', 'ngAnimate', 'ui.bootstrap'])
  .run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });
  });
