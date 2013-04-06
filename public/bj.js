
function bjStart()
{
  var karty1 = [new Card("kary", "A"), new Card("piky", "J")];
  var karty2 = [new Card("krize", "10"), new Card("srdce", "9")];
  
  setCardsCrupier(karty1);
  setCardsPlayer(karty2);
  
  setCash(15000);
  setPot(250);
  setPlayer('cervotoc');
}

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