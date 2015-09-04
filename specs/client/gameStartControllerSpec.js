describe('game/game-start/gameStartCtrl.js', function() {
  describe('the game start view controller', function() {
    
    beforeEach(function() { });
    afterEach(function() { });

    describe('I. socket connection', function(){
      describe('emitters', function(){
        it('should emit "enteredGame"', function() { 
          expect(true).to.be.false; 
        });
      }); // 'emitters'

      describe('listeners', function(){
        describe('on "startClock"', function() { 
          it('should start timer with data from server', function() { 
            expect(true).to.be.false; 
          });
        }); // 'on "startClock"'

        describe('on "startGame"', function() { 
          it('should route to gameRound view', function() { 
            expect(true).to.be.false; 
          });
        }); // 'on "startGame"'
      }); // 'listeners'
    }); // 'I. socket connection'


    describe('II. controller functions', function(){
      it('has none!', function(){});
    }); // 'II. controller functions'

    describe('III. view elements', function(){
      describe('timer', function(){
        it('count down to zero', function() { 
          expect(true).to.be.false; 
        });
      }); // 'list of lobbies'
    }); // 'III. view elements'
  }); // 'the game start view controller'
});
