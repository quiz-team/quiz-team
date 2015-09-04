describe('selection/selectionCtrl.js', function() {
  describe('the lobby selection screen controller', function() {
    
    beforeEach(function() { });
    afterEach(function() { });

    describe('I. socket connection', function(){
      describe('emitters', function(){
        it('should emit "enteredSelectionRoom"', function() { 
          expect(true).to.be.false; 
        });
        it('should update lobbiesData via callback', function() { 
          expect(true).to.be.false; 
        });
      }); // 'emitters'

      describe('listeners', function(){
        describe('on "updateLobbies"', function() { 
          it('should update lobbiesData', function() { 
            expect(true).to.be.false; 
          });
        }); // 'on "updateLobbies"'
      }); // 'listeners'
    }); // 'I. socket connection'


    describe('II. controller functions', function(){
      describe('$scope.createRoom()', function(){
        it('should exist', function() { 
          expect(true).to.be.false; 
        });

        it('should emit "createRoom"', function() { 
          expect(true).to.be.false; 
        });

        describe('"createRoom" emission', function(){
          it('should route to lobby view of created room', function(){
            expect(true).to.be.false;
          });
        }); // '"createRoom" emission'
      }); // '$scope.createRoom()'

      describe('$scope.joinLobby()', function(){
        it('should exist', function() { 
          expect(true).to.be.false; 
        });

        it('should emit "joinRoom"', function() { 
          expect(true).to.be.false;
        });

        describe('"joinRoom" emission', function(){
          it('should route to lobby view of joined room', function(){
            expect(true).to.be.false;
          });
        }); // '"joinRoom" emission'
      }); // '$scope.joinLobby()'
    }); // 'II. controller functions'

    describe('III. view elements', function(){
      describe('list of lobbies', function(){
        it('should refresh when new lobbies are created', function() { 
          expect(true).to.be.false; 
        });

        describe('lobby item', function(){
          it('should call joinRoom() on click', function(){
            expect(true).to.be.false;
          });
        }); // 'lobby item'
      }); // 'list of lobbies'

      describe('create room button', function(){
        it('should call createRoom()', function() { 
          expect(true).to.be.false; 
        });
      }); // 'create game button'
    }); // 'III. view elements'
  }); // 'the lobby selection screen controller'
});
