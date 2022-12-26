

let start_btn = document.getElementById('start-btn');
let game = document.getElementById('game');
let menu = document.getElementById('menu');

// Player money
var money = 100;
let player_money = document.getElementById('player-money');
player_money.innerHTML = money;
let bet = document.getElementById('bet')

// Bet
function bet(){
    if(bet.value <= money){
        money -= bet.value;
        player_money.innerHTML = money;
        start();
    }
    else{
        alert('You dont have enough money');
    }
}

// Cards
let player_total = document.getElementById('player-total');
let player_cards = document.getElementById('player-cards');
let dealer_total = document.getElementById('dealer-total');
let dealer_cards = document.getElementById('dealer-cards');
var playercard1 = Math.floor(Math.random() * 11) + 1;
var playercard2 = Math.floor(Math.random() * 11) + 1;
var dealercard1 = Math.floor(Math.random() * 11) + 1;
var dealercard2 = Math.floor(Math.random() * 11) + 1;

// Values for gamelogic
var playerTotal = 0;
var dealerTotal = 0;
var didHit = false;
var didStand = false;
var gameIsAlive = false;

// Start game
function start(){
    menu.style.display = 'none';
    game.style.visibility = 'visible';
    player_total.innerHTML = playercard1 + playercard2;
    playerTotal = playercard1 + playercard2;

    dealer_total.innerHTML = dealercard1;
    dealerTotal = dealercard1;

    player_cards.innerHTML = playercard1 + ' --- ' + playercard2;
    dealer_cards.innerHTML = dealercard1 + ' --- ' + '?';

    gameIsAlive = true;
    gameLogic();
}

// End game
function end(){
    menu.style.display = 'flex';
    game.style.visibility = 'hidden';
}

// Game logic
function gameLogic(){
    if(gameIsAlive && didHit){
        checkGameState();
    }

    if(gameIsAlive && didStand){

        if(playerTotal < 21 && dealerTotal > playerTotal && dealerTotal <= 21){
            alert('You lost');
            gameIsAlive = false;
            end();
        }
        else if(playerTotal == 21 && dealerTotal != 21){
            alert('You won!');
            money += (bet * 2);
            player_money.innerHTML = money;
            gameIsAlive = false;
            end();
        }
        else if (playerTotal < 21 && dealerTotal < playerTotal){
            alert('You won!');
            money += (bet * 2);
            player_money.innerHTML = money;
            gameIsAlive = false;
            end();
        }
    }
}

function checkGameState(){
    if(playerTotal > 21){
        alert('You lost');
        gameIsAlive = false;
        end();
    }
    else if(playerTotal == 21 && dealerTotal != 21){
        alert('You won!');
        money += bet;
        player_money.innerHTML = money;
        gameIsAlive = false;
        end();
    }
}

// Hit
function hit(){
    didHit = true;
    newPlayerCard();
    dealer_cards.innerHTML = dealercard1 + ' --- ' + dealercard2;
    dealer_total.innerHTML = dealercard1 + dealercard2;
    dealerTotal = dealercard1 + dealercard2;
}

// Stand
function stand(){
    didStand = true;
    var stand_button = document.getElementById('stand');
    stand_button.style.display = 'none';
    var hit_button = document.getElementById('hit');
    hit_button.style.display = 'none';
    dealer_cards.innerHTML = dealercard1 + ' --- ' + dealercard2;
    dealer_total.innerHTML = dealercard1 + dealercard2;
    dealerTotal = dealercard1 + dealercard2;
    if(playerTotal > dealerTotal < 17){
        newDealerCard();
        checkGameState();
    }
    checkGameState();
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


