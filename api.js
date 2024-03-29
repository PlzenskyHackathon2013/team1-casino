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