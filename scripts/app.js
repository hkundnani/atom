angular.module('atomApp', ['ngMaterial', 'ngMdIcons'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider
      .theme('input', 'default')
      .primaryPalette('grey')
  });
