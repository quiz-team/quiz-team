// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('meatloaf', [
  'ionic',
  'ui.router',
  'meatloaf.services',
  'meatloaf.selection',
  'meatloaf.lobby',
  'meatloaf.game.start',
  'meatloaf.game.round',
  'meatloaf.game.roundOver',
  'meatloaf.game.over'
]);

app.run(function($ionicPlatform, $rootScope, socket) {
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

  socket.setupSocket();

  // open socket connection

  // $rootScope.socket = io.connect('http://localhost:9090');
  // $rootScope.socket = io.connect('http://44f61333.ngrok.io');
  //debugger;
  //$rootScope.socket = io.connect();
});

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider.state('selection', {
    // url: '/selection',
    cache: false,
    url: '/',
    controller: 'selectionCtrl',
    templateUrl: 'components/selection/selectionView.html'
  })

  .state('lobby', {
    // url: '/lobby',
    cache: false,
    controller: 'lobbyCtrl',
    templateUrl: 'components/lobby/lobbyView.html',
    params: {
      'lobby': null
    }
  })

  .state('gameStart', {
    // url: '/gameStart',
    cache: false,
    controller: 'gameStartCtrl',
    templateUrl: 'components/game/game-start/gameStartView.html'
  })

  .state('gameRound', {
    cache: false,
    // url: '/gameRound',
    controller: 'gameRoundCtrl',
    templateUrl: 'components/game/game-round/gameRoundView.html'
  })

  .state('gameRoundOver', {
    cache: false,
    // url: '/gameRoundOver',
    controller: 'gameRoundOverCtrl',
    templateUrl: 'components/game/game-round-over/gameRoundOverView.html'
  })

  .state('gameOver', {
    cache: false,
    // url: '/gameOver',
    controller: 'gameOverCtrl',
    templateUrl: 'components/game/game-over/gameOverView.html'
  });

  // removes hash from url
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');
}]);