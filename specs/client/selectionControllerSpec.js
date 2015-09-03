
describe("A test suite", function() {
  beforeEach(function() { });
  afterEach(function() { });
  it('should fail', function() { 
    expect(true).to.be.false; 
  });
});


  // var $scope, $rootScope, $location, createController, $httpBackend, Links;

  // // using angular mocks, we can inject the injector
  // // to retrieve our dependencies
  // beforeEach(module('shortly'));
  // beforeEach(inject(function($injector) {

  //   // mock out our dependencies
  //   $rootScope = $injector.get('$rootScope');
  //   $httpBackend = $injector.get('$httpBackend');
  //   Links = $injector.get('Links');
  //   $location = $injector.get('$location');

  //   $scope = $rootScope.$new();

  //   var $controller = $injector.get('$controller');

  //   createController = function () {
  //     return $controller('ShortenController', {
  //       $scope: $scope,
  //       Links: Links,
  //       $location: $location
  //     });
  //   };

  //   createController();
  // }));

// });