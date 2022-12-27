

let start_btn = document.getElementById('start-btn');
let game = document.getElementById('game');
let menu = document.getElementById('menu');

// Player money
var money = 100;
let player_money = document.getElementById('player-money');
player_money.innerHTML = money;


// Bet
function bet(){
    let bet_value = document.getElementById('bet').value;
    if(bet_value <= money){
        money -= bet_value;
        player_money.innerHTML = money;
        start();
    }
    else {
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
    checkGameState();
}

// End game
function end(){
    menu.style.display = 'flex';
    game.style.visibility = 'hidden';
}

// Game logic
/*
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
            money += (bet_value * 2);
            player_money.innerHTML = money;
            gameIsAlive = false;
            end();
        }
        else if (playerTotal < 21 && dealerTotal < playerTotal){
            alert('You won!');
            money += (bet_value * 2);
            player_money.innerHTML = money;
            gameIsAlive = false;
            end();
        }
    }
}
*/

function checkGameState(){
    if( playerTotal == 21){
        didStand = true;
    }

    if(didStand){
        if(playerTotal > dealerTotal < 21){
            newDealerCard();
            checkGameState();
        } else if (dealerTotal > 21){
                alert('You won!');
                money += (bet_value * 2);
                player_money.innerHTML = money;
                gameIsAlive = false;
                end();   
        } else if (playerTotal < dealerTotal <= 21){
            alert('You lost');
            gameIsAlive = false;
            end();
        }
    } else if(playerTotal > 21){
        alert('You lost');
        gameIsAlive = false;
        end();
    } else if(playerTotal == 21 && dealerTotal == 21){
        alert('You lost');
        gameIsAlive = false;
        end();
    }
}


// Hit
function hit(){
    //didHit = true;
    newPlayerCard();
    dealer_cards.innerHTML = dealercard1 + ' --- ' + dealercard2;
    dealer_total.innerHTML = dealercard1 + dealercard2;
    dealerTotal = dealercard1 + dealercard2;
    checkGameState();
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


