

let start_btn = document.getElementById('start-btn');
var stand_button = document.getElementById('stand');
var hit_button = document.getElementById('hit');
let game = document.getElementById('game');
let menu = document.getElementById('menu');
let end_menu = document.getElementById('end');
let result = document.getElementById('result');

// Player money
var money = 100;
let player_money = document.getElementById('player-money');
player_money.innerHTML = money;

// Bet
let bet_value = document.getElementById('bet').value;
function bet(){
    checkBet();
    console.log(bet_value)
    if(bet_value != 0){
        if(bet_value <= money){
            money -= bet_value;
            player_money.innerHTML = money;
            start();
        }
        else {
            alert('You dont have enough money');
        }
    } else {
        alert('You need to bet something');
    }
}

// Check bet value
function checkBet(){
    bet_value = document.getElementById('bet').value;
}

// Cards
let player_total = document.getElementById('player-total');
let player_cards = document.getElementById('player-cards');
let dealer_total = document.getElementById('dealer-total');
let dealer_cards = document.getElementById('dealer-cards');
var playercard1 = 0
var playercard2 = 0
var dealercard1 = 0
var dealercard2 = 0

// Shuffle cards
function shuffleCards(){
    playercard1 = newCard();
    playercard2 = newCard();
    dealercard1 = newCard();
    dealercard2 = newCard();
}

// Values for gamelogic
var playerTotal = 0;
var dealerTotal = 0;
var didStand = false;
var gameIsAlive = false;

// Start game
function start(){
    console.log(playerTotal);
    console.log(dealerTotal);
    shuffleCards();
    menu.style.display = 'none';
    game.style.display = 'flex';
    player_total.innerHTML = playercard1 + playercard2;
    playerTotal = playercard1 + playercard2;

    dealer_total.innerHTML = dealercard1;
    dealerTotal = dealercard1;

    player_cards.innerHTML = playercard1 + ' --- ' + playercard2;
    dealer_cards.innerHTML = dealercard1 + ' --- ' + '?';

    gameIsAlive = true;
    checkGameState();
}

// Menu for ended game
function endMenu(){
    stand_button.style.display = 'none';
    hit_button.style.display = 'none';
    end_menu.style.display = 'flex';
}

// End game
function end(){
    menu.style.display = 'flex';
    game.style.display = 'none';
    end_menu.style.display = 'none';
    reset();
}

// Reset values
function reset(){
    playerTotal = 0;
    dealerTotal = 0;
    didStand = false;
    player_total.innerHTML = 0;
    dealer_total.innerHTML = 0;
    player_cards.innerHTML = '';
    dealer_cards.innerHTML = '';
    stand_button.style.display = 'block';
    hit_button.style.display = 'block';
    player_total.style.color = 'rgb(216, 216, 2)';
    dealer_total.style.color = 'rgb(216, 216, 2)';
}

function checkGameState(){
    if( !didStand && playerTotal == 21){
        didStand = true;
        dealer_cards.innerHTML = dealercard1 + ' --- ' + dealercard2;
        dealer_total.innerHTML = dealercard1 + dealercard2;
        dealerTotal = dealercard1 + dealercard2;
    }

    if(didStand){

        if(playerTotal > dealerTotal && dealerTotal < 21){
            newDealerCard();
            checkGameState();
        } else if (dealerTotal > 21){
            bust();
            checkBet();
            money += (bet_value * 2);
            player_money.innerHTML = money;
            gameIsAlive = false;
            result.innerHTML = 'You won! ????';
            endMenu();
        } else if (playerTotal < dealerTotal && dealerTotal <= 21){
            gameIsAlive = false;
            result.innerHTML = 'You lost! ????';
            endMenu();
        } else if(playerTotal == dealerTotal){
            checkBet();
            money = parseInt(money) + parseInt(bet_value);
            player_money.innerHTML = money;
            gameIsAlive = false;
            result.innerHTML = 'It\'s a draw! ????';
            endMenu();
        }
    } else if(playerTotal > 21){
        bust();
        gameIsAlive = false;
        result.innerHTML = 'BUST! You lost! ????';
        endMenu();
    } else if(dealerTotal > 21){
        bust();
        checkBet();
        money += (bet_value * 2);
        player_money.innerHTML = money;
        gameIsAlive = false;
        result.innerHTML = 'You won! ????';
        endMenu();
    }
}


// Hit
function hit(){
    newPlayerCard();
    dealer_cards.innerHTML = dealercard1 + ' --- ' + dealercard2;
    dealer_total.innerHTML = dealercard1 + dealercard2;
    dealerTotal = dealercard1 + dealercard2;
    checkGameState();
}

// Stand
function stand(){
    didStand = true;
    stand_button.style.display = 'none';
    hit_button.style.display = 'none';
    dealer_cards.innerHTML = dealercard1 + ' --- ' + dealercard2;
    dealer_total.innerHTML = dealercard1 + dealercard2;
    dealerTotal = dealercard1 + dealercard2;
    checkGameState();
}

// Bust
function bust(){
    if (playerTotal > 21){
        player_total.style.color = 'red';
    } else if (dealerTotal > 21){
        dealer_total.style.color = 'red';
    }
}

// New player card on hit
function newPlayerCard(){
    var newPlayerCard = newCard();
    player_cards.innerHTML += ' --- ' + newPlayerCard;
    player_total.innerHTML = parseInt(player_total.innerHTML) + newPlayerCard;
    playerTotal += newPlayerCard;
}

// New dealer card on stand
function newDealerCard(){
    var newDealerCard = newCard();
    dealer_cards.innerHTML += ' --- ' + newDealerCard;
    dealer_total.innerHTML = parseInt(dealer_total.innerHTML) + newDealerCard;
    dealerTotal += newDealerCard;
}

// New card generator
function newCard(){
    return Math.floor(Math.random() * 11) + 1;
}


