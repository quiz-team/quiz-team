describe('game/game-round/gameRoundCtrl.js', function() {
  describe('the game round controller', function() {
    
    beforeEach(function() { });
    afterEach(function() { });

    describe('I. socket connection', function(){

      describe('emitters', function(){
        it('should emit "enteredRound"', function() { 
          expect(true).to.be.false; 
        });
      }); // 'emitters'

      describe('listeners', function(){
        describe('on "startRound"', function() { 
          it('should do something', function() { 
            expect(true).to.be.false; 
          });
        }); // '"startRound"'

        describe('on "endRound"', function() { 
          it('should stop timer', function() { 
            expect(true).to.be.false; 
          });

          it('should emit "gameRoundOver"', function() { 
            expect(true).to.be.false; 
          });

          it('should route to gameRoundOver', function() { 
            expect(true).to.be.false; 
          });
        }); // '"endRound"'
      }); // 'listeners'
    }); // 'I. socket connection'

    describe('II. controller functions', function(){
      describe('$scope.selectAnswer()', function(){
        it('should exist', function() { 
          expect(true).to.be.false; 
        });

        it('should lock an answer', function() { 
          expect(true).to.be.false; 
        });
      }); // '$scope.selectAnswer()'

      describe('$scope.unselectAnswer()', function(){
        it('should exist', function() { 
          expect(true).to.be.false; 
        });

        it('should unselect answer when round ends', function() { 
          expect(true).to.be.false; 
        });
      }); // '$scope.unselectAnswer()'

      describe('$scope.isLockedAnswer()', function(){
        it('should exist? we do not use it...', function() { 
          expect(true).to.be.false; 
        });
      }); // '$scope.isLockedAnswer()'

      describe('lockAnswer()', function(){
        it('should exist', function() { 
          expect(true).to.be.false; 
        });

        it('should save locked answer in lockedAnswer object', function() { 
          expect(true).to.be.false; 
        });
      }); // 'lockAnswer()'
    }); // 'II. controller functions'

    describe('III. view elements', function() {
      describe('question', function() {
        it('should exist', function() { 
          expect(true).to.be.false; 
        });
      }); // 'question'

      describe('timer', function() {
        it('should have a max value', function() { 
          expect(true).to.be.false; 
        });

        it('should count down to zero', function() { 
          expect(true).to.be.false; 
        });
      }); // 'timer'

      describe('answer grid', function() {
        it('should have six items', function() { 
          expect(true).to.be.false; 
        });

        describe('answer item', function() {
          it('should have text', function() { 
            expect(true).to.be.false; 
          });

          it('can be locked', function() { 
            expect(true).to.be.false; 
          }); 

          describe('locked answer', function(){
            it('changes when other answer is locked', function() { 
              expect(true).to.be.false; 
            }); 

            it('style reflects locked answer', function() { 
              expect(true).to.be.false; 
            }); 
          }); // 'locked answer'
        }); // 'grid item'        
      }); // 'answer grid'
    }); // 'III. view elements'
  }); // 'the game round controller'
});
