// ======Load HTML page====== //
document.addEventListener("DOMContentLoaded", function(){
// Created Class second try at Object Oriented Programming //
    class NewGame{
        // Constructor for the class, variables that will be used in the methods//
        constructor(){
            this.table = document.getElementsByClassName('table');
            this.card = document.getElementsByClassName('card');
            this.front = document.getElementsByClassName('front');
            this.back = document.getElementsByClassName('back');
            this.turnCounter = document.getElementsByClassName('turns');
            this.allCards = document.querySelectorAll('.card');
            this.button = document.getElementById('reset_button');
            this.modal = document.getElementById('myModal');
            this.btn = document.getElementById("myBtn");
            this.span = document.getElementsByClassName("close")[0];
            this.modalcounter = document.getElementsByClassName("outputturn");
            this.counter = 0;
            this.flipped = true;
            this.pairsMatched = 0;
            this.firstCard = null;
            this.secondCard = null;
        }

        // this will be the main method that will control the behavior of cards//
        main(){
            // declared variables and instantiate methods //
            var location = this;
            this.shuffle();
            this.hardReset()

            // for each loop adds click listeners to all cards //
            this.allCards.forEach(cards => cards.addEventListener('click', function(){
                
                // ==changes class to create the flip effect== //   
                this.classList.add('flip');
                if (location.firstCard === this) {
                    return;
                }
                else if (location.flipped === true) {
                    location.firstCard = this;
                    location.firstCard.removeEventListener('click', this);      
                    location.flipped = false; 
                }else{
                    location.secondCard = this;
                    location.secondCard.removeEventListener('click', this);
                    location.flipped = true;  
                    location.turns();
                    //==Matching and Unmatched Logic==//
                    if ((location.flipped === true) && (location.firstCard.dataset.img === location.secondCard.dataset.img)) {
                        location.winTrigger();
                        location.reset()
                    }else{
                        setTimeout(function() {
                            location.firstCard.classList.remove('flip');
                            location.secondCard.classList.remove('flip');
                            location.reset();
                        }, 500);    
                    }
                }  
            }));
        }
        // since cards utilizes flexbox shuffle will change the style of each card and assign a random number to the order //
        shuffle() {
            this.allCards.forEach(card => {
                let randomPos = Math.floor(Math.random() * this.card.length);
                card.style.order = randomPos;
            });
        }
        reset() {
            this.flipped = true;
            this.firstCard = null;
            this.secondCard = null;
        }
        turns(){
            this.counter++
            this.turnCounter[0].innerText = this.counter;
        }
        winTrigger(){
            const location = this;
            setTimeout(function(){
                if (location.pairsMatched === (location.card.length/2)) {
                    location.modalBox();
                }
            }, 400);
            this.pairsMatched++;
        }
        hardReset(){
            const location = this;
            this.button.addEventListener('click', function() {
                location.flipped = true;
                location.firstCard = null;
                location.secondCard = null;
                location.counter = 0;
                location.pairsMatched = 0;
                location.allCards.forEach(card => {
                    card.classList.remove('flip');
                });
                location.turnCounter[0].innerText = location.counter;
                setTimeout(function() {
                    location.shuffle();
                }, 500);
            });
        }
        modalBox(){
            const location = this;
            this.modal.style.display = "block";
            location.modalcounter[0].innerText = location.counter;
            this.span.onclick = function() {
                location.modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == location.modal) {
                    location.modal.style.display = "none";
                }
            }
        }
    } //End Of Class
        
    // ===Instantiate the new class=== //
    const MemoryGame = new NewGame();
    MemoryGame.main();
}) // End of DOMContentloaded