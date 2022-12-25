

let start_btn = document.getElementById('start-btn');
let game = document.getElementById('game');
let menu = document.getElementById('menu');

// Player money
var money = 100;
let player_money = document.getElementById('player-money');
player_money.innerHTML = money;

// Bet
function bet(){
    let bet = document.getElementById('bet').value;
    if(bet <= money){
        money -= bet;
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

// Start game
function start(){
    menu.style.display = 'none';
    game.style.visibility = 'visible';

    player_total.innerHTML = playercard1 + playercard2;
    dealer_total.innerHTML = dealercard1;

    player_cards.innerHTML = playercard1 + ' --- ' + playercard2;
    dealer_cards.innerHTML = dealercard1 + ' --- ' + '?';
}

function hit(){
    var newPlayerCard = newCard();
    player_cards.innerHTML += ' --- ' + newPlayerCard;
    player_total.innerHTML = parseInt(player_total.innerHTML) + newPlayerCard;
}

// New card
function newCard(){
    return Math.floor(Math.random() * 11) + 1;
}


