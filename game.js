/**
 * @author VF
 */
/**
 * Konsktruktor hry.
 */
exports.BlackJack = function(name, id) {
	//jmeno hry ?????
	this.name = name;
	//id hry
	this.id = id;
	//dealer
	this.dealer = new Player();
	//dealer je obyc hrac, jenom ma flag
	this.dealer.isDealer = true;
	//hrac ve hre pri vytvoreni neni
	this.player = undefined;
	//bank je prazdny
	this.bank = 0;
	//vezmu karty
	this.deck = new Deck();
	//zamicham karty
	this.deck.shuffle();
};

/**
 * Start hry.
 */
BlackJack.prototype.start = function(meta) {
	this.player.cash -= meta[0];
	this.bank += meta[0];

	//jedna karta pro krupiera
	this.updateGame("hit", new Array(true));
	// dve karty pro hrace
	this.updateGame("hit", new Array(false));
	this.updateGame("hit", new Array(false));
};

/**
 * Pridam hrace do hry.
 * @param {Object} player - hrac na pridani
 */
BlackJack.prototype.assignPlayer = function(player) {
	this.player = player;
};

/**
 * Hra je automat, timhle prechazim mezi stavy.
 * @param {Object} action - jaka akce - spojeno s tlacitkem na klientu
 * @param {Object} meta - metadata akce - musi byt pole, mozno null
 */
BlackJack.prototype.updateGame = function(action, meta) {
	window.console.log(action);

	switch(action) {
		case "start":
			this.start(meta);
			break;
		case "double":
			this.doubleGame()
			break;
		case "hit":
			this.hit(meta);
			break;
		case "stand":
			this.stand();
			break;
	}
};

/**
 * Vsadim dvojnasobek v potu.
 */
BlackJack.prototype.doubleGame = function() {
	this.player.cash -= this.bank;
	this.bank *= 2;
};

/**
 * Liznout kartu.
 * @param {Object} meta - true/false - true liza krupier, false liza hrac
 */
BlackJack.prototype.hit = function(meta) {
	if (meta[0] == true) {
		this.dealer.cards.push(this.deck.getCard());
	} else {
		this.player.cards.push(this.deck.getCard());
	}
};

/**
 * Hrac stoji. Ukoncil hru, ceka jak to dopadne s krupierem.
 */
BlackJack.prototype.stand = function() {
	while (this.dealerDrawCard()) {
		this.updateGame("hit", new Array(true));
	}
	this.player.canDrawCard = false;
	this.dealer.canDrawCard = false;
};

/**
 * Elementarni umela inteligence. Bude krupier lizat dalsi kartu?
 */
BlackJack.prototype.dealerDrawCard = function() {
	var score = this.dealer.getHandScore();
	if (score >= 21) {
		return false;
	}

	var prob = (21 - score) / 11;
	var dice = Math.random();

	if (dice < prob) {
		return true;
	}

	return false;
};

/**
 * Nastal konec hry?
 */
BlackJack.prototype.isGameFinished = function() {
	if (this.player.getHandScore() == 21) {
		return true;
	}

	if (this.player.getHandScore() > 21) {
		return true;
	}

	if (this.dealer.getHandScore() > 21) {
		return true;
	}

	if (this.dealer.canDrawCard == false && this.dealer.canDrawCard == false) {
		return true;
	}

	return false;
};

BlackJack.prototype.playerWon = function() {
	var plScore = this.player.getHandScore();
	// hrac pretahnul
	if (plScore > 21) {
		return false;
	}

	// hrac ma black jack
	if (plScore == 21) {
		return true;
	}

	// krupier pretahnul
	if (this.dealer.getHandScore > 21) {
		return true;
	}

	// hrac ma vic nebo stejne jako krupier, tj. je bliz 21
	if (plScore >= this.dealer.getHandScore()) {
		return true;
	}

	// sem by se to nikdy nemelo dostat
	return false;
};

BlackJack.prototype.toString = function() {
	var str = "";

	str += this.player.toString() + "\n";
	str += "player cards: \n";
	for (var i = this.player.cards.length - 1; i >= 0; i--) {
		str += this.player.cards[i].toString() + ", ";
	};
	str += "\n";

	str += this.dealer.toString() + "\n";
	str += "dealer cards: \n";
	for (var i = this.dealer.cards.length - 1; i >= 0; i--) {
		str += this.dealer.cards[i].toString() + ", ";
	};
	str += "\n";

	str += "player cash: " + this.player.cash + "\n";
	str += "bank: " + this.bank;

	return str;
};

BlackJack.prototype.getGameState = function() {
	var gs = new BJackGamestate();
	gs.id = this.id;
	gs.name = this.name;
	gs.dealer = this.dealer;
	gs.player = this.player;
	gs.pot = this.pot;
	gs.gameEnded = this.isGameFinished();
	gs.playerWon = this.playerWon();
};

exports.GameMaster = function() {
	this.games = new Array();
};

GameMaster.prototype.processNewUser = function(firstConnect) {
	var guid = my_guid();
	var game = new BlackJack("bj", guid);
	game.assignPlayer(new Player());
	game.player.id = guid;
	game.player.name = firstConnect;
	this.games.push(game);
	var c_id = new clientId();
	c_id.client_id = guid;

	return c_id;
};

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

function my_guid() {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

GameMaster.prototype.processAction = function(clientId, gameAction) {
	for (var key in this.games) {
		if (this.games[key].id == clientId.client_id) {
			this.games[key].updateGame(gameAction.action, gameAction.meta);
			return;
		}
	}
};

GameMaster.prototype.getGameState = function(userID) {
	for (var key in this.games) {
		if (this.games[key].id == clientId) {
			this.games[key].getGameState();
			return;
		}
	}
};

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

function Card(color, value) {
	this.color = color;
	this.value = value;
};

Card.prototype.toString = function() {
	return this.color + "-" + this.value;
};

function Deck() {
	this.cardColors = new Array("srdce", "piky", "krize", "kary");
	this.cardValues = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
	this.cards = new Array();

	var counter = 0;
	for (var i = this.cardColors.length - 1; i >= 0; i--) {
		for (var j = this.cardValues.length - 1; j >= 0; j--) {
			this.cards[counter] = new Card(this.cardColors[i], this.cardValues[j]);
			counter++;
		};
	};

	this.pointer = -1;
};

/**
 * Hodnota karty.
 */
Card.prototype.getScore = function() {
	var score = parseInt(this.value);
	if (isNaN(score)) {
		if (this.value == "A") {
			return 11;
		} else {
			return 10;
		}
	}
	
	return score;
};

/**
 * Zamichat balik karet.
 */
Deck.prototype.shuffle = function() {
	for (var j, x, i = this.cards.length; i; j = parseInt(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
};

Deck.prototype.toString = function() {
	var str = "";

	for (var i = this.cards.length - 1; i >= 0; i--) {
		str += this.cards[i].toString() + "\n";
	};

	return str;
};

/**
 * Liznout kartu.
 */
Deck.prototype.getCard = function() {
	this.pointer++;
	return this.cards[this.pointer];
};

/**
 * Hrac.
 */
function Player() {
	this.isDealer = false;
	this.cards = new Array();
	this.canDrawCard = true;
	this.cash = 100;
};

/**
 * Skore karet v ruce.
 */
Player.prototype.getHandScore = function() {
	var score = 0;
	for (var i = this.cards.length - 1; i >= 0; i--) {
		score += this.cards[i].getScore();
	};

	return score;
}

Player.prototype.toString = function() {
	var str = ">>>>Player:\n";
	str += this.isDealer + "\n";
	str += this.cash;
	return str;
}
