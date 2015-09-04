describe('game/game-round-over/gameRoundOverCtrl.js', function() {
  describe('the end of round controller', function() {
    
    beforeEach(function() { });
    afterEach(function() { });

    describe('I. socket connection', function(){
      describe('emitters', function(){
        it('should emit "enteredRoundOver"', function() { 
          expect(true).to.be.false; 
        });
      }); // 'emitters'

      describe('listeners', function(){
        describe('on "roundResults"', function() { 
          it('should update score display', function() { 
            expect(true).to.be.false; 
          });

          it('should start countdown timer', function() { 
            expect(true).to.be.false; 
          });
        }); // '"roundResults"'

        describe('on "nextRound"', function() { 
          it('should stop timer', function() { 
            expect(true).to.be.false; 
          });

          it('should route to gameRound with params', function() { 
            expect(true).to.be.false; 
          });
        }); // '"nextRound"'

        describe('on "gameOver"', function() { 
          it('should stop timer', function() { 
            expect(true).to.be.false; 
          });

          it('should route to gameOver', function() { 
            expect(true).to.be.false; 
          });
        }); // '"gameOver"'
      }); // 'listeners'
    }); // 'I. socket connection'

    describe('II. controller functions', function(){
      it('has none!', function(){});      
    }); // 'II. controller functions'

    describe('III. view elements', function(){
      describe('round score', function(){
        it('should be accurate', function() { 
          expect(true).to.be.false; 
        });
      }); // 'round score'

      describe('timer', function() {
        it('should count down to zero', function(){
          expect(true).to.be.false; 
        });
      }); // 'timer'
    }); // 'III. view elements'
  }); // 'the end of round controller'
});
