// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('meatloaf', [
  'ionic',
  'ui.router',
  'meatloaf.splash',
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

  // THIS IS FOR DEBUGGING
  $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
    // this seems hacky... 
    // fixes bug where on 2nd game, round and round over controller code is ran twice
    // if (toState.name === fromState.name) {
    //   evt.preventDefault();
    // }
    // console.log('coming from: ', fromState.name, ' state');
    // console.log('going to     ', toState.name, ' state');


  });
});

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('splash', {
      cache: false,
      url: '/',
      controller: 'splashCtrl',
      templateUrl: 'components/splash/splashView.html'
    })

    .state('selection', {
      cache: false,
      // url: '/',
      controller: 'selectionCtrl',
      templateUrl: 'components/selection/selectionView.html'
    })

    .state('loading', {
      templateUrl: 'components/loading/loading.html'
    })

    .state('lobby', {
      cache: false,
      controller: 'lobbyCtrl',
      templateUrl: 'components/lobby/lobbyView.html',
      params: {
        'lobby': null
      }
    })

    .state('gameStart', {
      cache: false,
      controller: 'gameStartCtrl',
      templateUrl: 'components/game/game-start/gameStartView.html'
    })

    .state('gameRound', {
      cache: false,
      controller: 'gameRoundCtrl',
      templateUrl: 'components/game/game-round/gameRoundView.html'
    })

    .state('gameRoundOver', {
      cache: false,
      controller: 'gameRoundOverCtrl',
      templateUrl: 'components/game/game-round-over/gameRoundOverView.html'
    })

    .state('gameOver', {
      cache: false,
      controller: 'gameOverCtrl',
      templateUrl: 'components/game/game-over/gameOverView.html'
    });

  // removes hash from url
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');
}]);