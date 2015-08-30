// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('meatloaf', [
  'ionic',
  'ui.router',
  'meatloaf.selection',
  'meatloaf.lobby',
  'meatloaf.game'
]);

app.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // open socket connection
  //$rootScope.socket = io.connect('http://263689ea.ngrok.io');
  $rootScope.socket = io.connect('http://localhost:9090');
  //debugger;
  //$rootScope.socket = io.connect();
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('selection', {
    url: '/selection',
    controller: 'selectionCtrl',
    templateUrl: 'components/selection/selectionView.html'
  })

  .state('lobby', {
    url: '/lobby',
    controller: 'lobbyCtrl',
    templateUrl: 'components/lobby/lobbyView.html',
    params: {
      'lobby': null
    }
  })

  .state('game', {
    url: '/game',
    controller: 'gameCtrl',
    templateUrl: 'components/game/gameView.html'

  });

  $urlRouterProvider.otherwise('/selection');
}]);