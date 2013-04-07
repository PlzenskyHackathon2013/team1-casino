function bjStart()
{
  var ioc = io.connect('http://firstapp-casino.ph');
  //var chat_comet = io.connect('http://localhost:8080');
  ioc.emit('login', { my: 'data'});
  
  ioc.on('msg', function (bJackGamestate) {
    
    setCardsCrupier(bJackGamestate.dealer.cards);
    setCardsPlayer(bJackGamestate.player.cards);
    
    setCash(bJackGamestate.player.cash);
    setPot(bJackGamestate.pot);
    setPlayer(bJackGamestate.player.id);

  });
    
}

/***********************************
 * Format zprav z klienta na server.
 **********************************/

/**
 * Klient o sobe dava vedet, pozaduje prideleni serveroveho ID.
 * @param {Object} userId - ??? bude tohle potreba?
 */
function firstConnect() {
	this.user_id = undefined;
}

/**
 * Klient informuje o tom, ze provedl herni akci - kliknuti na tlacitko.
 * @param {String} action - string s typem akce (start, hit, double, stand)
 * @param {Array} meta - pole s daty akce, muze byt null
 * Pozadovane kombinace:
 * start(sazka) - kolik hrac vsadi na zacatku, nez dostane karty
 * hit([false]) - hrac lize kartu - [false] neni krupier
 * double(null) - hrac chce sazku zvysit 2x
 * 		- klient musi pohlidat, ze si to uzivatel muze dovolit
 * stand(null)  - hrac konci s aktivni hrou, ceka jak to dopadne u dealera
 */
function gameAction() {
	this.action = undefined;
	this.meta = undefined;
}

/**
 * id clienta 
 */
function clientId() {
	this.client_id = undefined;
}

/***********************************
 * Format zprav ze serveru klientovi.
 ***********************************/
/**
 * Server vraci klientovi jeho unikatni ID pro danou hru.
 * @param client_id - string ID
 */
function clientId() {
	this.client_id = undefined;
}

/**
 * Stav hry na serveru. Tohle dostane hrac jako odpoved na svoji akci.
 */
function BJackGamestate() {
	//unikatni ID hry
	this.id = undefined;
	//jmeno hry ?????
	this.name = undefined;
	// objekt Dealer s isDealer = true
	this.dealer = undefined;
	// objekt Player
	this.player = undefined;
	// sazky na stole
	this.pot = undefined;
	//je hra skoncena?
	this.gameEnded = undefined;
	//vyhral hrac?
	this.playerWon = undefined;
}

function Player() {
	//unikatni ID hrace
	this.id = undefined;
	//prezdivka hrace
	this.name = undefined;
	// je hrac krupier? TRUE ano je krupier, FALSE ne neni krupier
	this.isDealer = undefined;
	// pole karet, ktere ma hrac v ruce
	this.cards = undefined;
	// penize, ktere ma hrac v kapse
	this.cash = undefined;
}

function Card() {
	// string - "srdce", "piky", "krize", "kary"
	this.color = undefined;
	// hodnota karty - "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
	this.value = undefined;
};

function controlDouble()
{
  alert("controlDouble();");
  return false;
}

function controlStand()
{
  alert("controlStand();");
  return false;
}

function controlHit()
{
  alert("controlHit();");
  return false;
}

function controlStart()
{
  alert("controlStart();");
  return false;
}

function leaveGame()
{
  alert("leaveGame();");
  return false;
}

function addPut(number)
{
  if(number == 1 || number == 15 || number == 50 || number == 100)
  {
    alert("addPut(" + number + ");");
  }
  return false;
}

function Card(color, value) {
 	this.color = color;
	this.value = value;
};
    
function setCardsCrupier(cards)
{
  $('#cards-crupier').html('');
  for(var key in cards)
  {    
    $('#cards-crupier').append('<div class="karta ' + cards[key].color + cards[key].value  + '"></div>');
  }
}
  
function setCardsPlayer(cards)
{
  $('#cards-player').html('');
  for(var key in cards)
  {    
    $('#cards-player').append('<div class="karta ' + cards[key].color + cards[key].value  + '"></div>');
  }
}

function setCash(number)
{
  $('#cash').html('$' + number);
}

function setPlayer(nick)
{
  $('#player').html(nick);
}

function setPot(number)
{
  $('#pot').html('$' + number);
}