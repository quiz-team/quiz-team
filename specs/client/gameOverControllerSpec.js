describe('game/game-over/gameOverCtrl.js', function() {
  describe('the end of game controller', function() {
    
    beforeEach(function() { });
    afterEach(function() { });

    describe('I. socket connection', function(){
      describe('emitters', function(){
        it('should emit "enteredGameOver"', function() { 
          expect(true).to.be.false; 
        });
      }); // 'emitters'

      describe('listeners', function(){
        describe('on "gameStats"', function() { 
          it('should update score display', function() { 
            expect(true).to.be.false; 
          });
        }); // '"gameStats"'

        describe('on "restartGame"', function() { 
          it('should route to gameStart', function() { 
            expect(true).to.be.false; 
          });

          it('should probably do something else, too', function() { 
            expect(true).to.be.false; 
          });
        }); // '"restartGame"'
      }); // 'listeners'
    }); // 'I. socket connection'

    describe('II. controller functions', function(){
      describe('$scope.QuitGame()', function(){
        it('should exist, but should it be capitalized?', function() { 
          expect(true).to.be.false; 
        });

        it('should emit "quitGame" via socket', function() { 
          expect(true).to.be.false; 
        });
      }); // 'QuitGame function'

      describe('$scope.PlayAgain()', function(){
        it('should exist, but should it be capitalized?', function() { 
          expect(true).to.be.false; 
        });

        it('should emit "playAgain" via socket', function() { 
          expect(true).to.be.false; 
        });
      }); // 'PlayAgain function'
    }); // 'II. controller functions'

    describe('III. view elements', function(){
      describe('score display', function(){
        it('should display the overall score', function() { 
          expect(true).to.be.false; 
        });
      }); // 'score display'

      describe('quit button', function() {
        it('should call QuitGame()', function(){
          expect(true).to.be.false; 
        });
      }); // 'quit button'
    }); // 'III. view elements'
  }); // 'the end of game controller'
});
