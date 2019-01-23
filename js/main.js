// ======Load HTML page====== //
document.addEventListener("DOMContentLoaded", function(){
// Create Class second try at OOP //
    class NewGame{
        // Constructor for the class, variables that will be used in the methods//
        constructor(){
            this.table = document.getElementsByClassName('table');
            this.card = document.getElementsByClassName('card');
            this.front = document.getElementsByClassName('front');
            this.back = document.getElementsByClassName('back')
        }
        // adds click listeners to all cards and intstantiates the shuffle method//
        getCards(){
            this.shuffle();
            allCards.forEach(cards => cards.addEventListener('click', this.main));
        }
        // since cards utilizes flexbox shuffle will change the style of each card and assign a random number to the order //
        shuffle() {
            allCards.forEach(card => {
                console.log(this.card.length);
                let randomPos = Math.floor(Math.random() * this.card.length);
                card.style.order = randomPos;
            });
          }
        // this will be the main method that will control the behavior of cards//
        main(){
            function reset() {
                flipped = true;
                firstCard = null;
                secondCard = null;
            }
            this.classList.add('flip');
            if (firstCard === this) {
                return;
            }
            else if (flipped === true) {
                firstCard = this;
                firstCard.removeEventListener('click', this);      
                flipped = false; 
                return;
            }else{
                secondCard = this;
                secondCard.removeEventListener('click', this);
                flipped = true;   
                //==Matching and Unmatched Logic==//
                if (flipped === true && firstCard.dataset.img === secondCard.dataset.img) {
                    console.log('matched pair');
                    reset()
                }else{
                    setTimeout(function() {
                        firstCard.classList.remove('flip');
                        secondCard.classList.remove('flip');
                        reset();
                    }, 500);    
                }
            }  
        }
    }
    let flipped = true;
    let firstCard, secondCard;
    const allCards = document.querySelectorAll('.card');
    // ===Instantiate the class=== //
    const MemoryGame = new NewGame();
    MemoryGame.getCards();
    

}) // End of DOMContentloaded