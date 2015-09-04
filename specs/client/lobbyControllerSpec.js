describe('lobby/lobbyCtrl.js', function() {
  describe('the lobby controller', function() {
    
    beforeEach(function() { });
    afterEach(function() { });

    describe('I. socket connection', function(){
      describe('emitters', function(){
        it('should emit "enteredLobby"', function() { 
          expect(true).to.be.false; 
        });
      }); // 'emitters'

      describe('listeners', function(){
        describe('on "updatePlayers"', function() { 
          it('should assign player objects array to scope', function() { 
            expect(true).to.be.false; 
          });
        }); // '"updatePlayers"'

        describe('on "startGame"', function() { 
          it('should route to gameStart view', function() { 
            expect(true).to.be.false; 
          });
        }); // '"startGame"'
      }); // 'listeners'
    }); // 'I. socket connection'


    describe('II. controller functions', function(){
      describe('leaveLobby()', function(){
        it('should exist', function() { 
          expect(true).to.be.false; 
        });

        it('should emit "leaveLobby" via socket with lobby id', function() { 
          expect(true).to.be.false; 
        });

        it('should route user to selection view', function() { 
          expect(true).to.be.false; 
        });
      }); // 'leaveLobby function'

      describe('readyOn()', function(){
        it('should exist', function() { 
          expect(true).to.be.false; 
        });

        it('should emit "readyOn" via socket with lobby id', function() { 
          expect(true).to.be.false; 
        });
      }); // 'readyOn function'

      describe('readyOff()', function(){
        it('should exist', function() { 
          expect(true).to.be.false; 
        });

        it('should emit "readyOff" via socket with lobby id', function() { 
          expect(true).to.be.false; 
        });
      }); // 'readyOff function'
    }); // 'II. controller functions'

    describe('III. view elements', function(){
      describe('created lobby', function(){
        it('should have a name', function() { 
          expect(true).to.be.false; 
        });

        it('should contain player', function() { 
          expect(true).to.be.false; 
        });
      }); // 'created lobby'
    }); // 'III. view elements'
  }); // 'the lobby controller'
});
