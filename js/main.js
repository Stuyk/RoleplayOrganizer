const db = require('./js/database');
/** Database Helpers **/
function getAllCharacters() {
  db.getAllCharacters(function(characters) {
    console.log(`Found Characters, Amount: ${characters.length}`);
    for (var i = 0; i < characters.length; i++) {
      $('#characterLoadingPanel').append(`
      <button type="button"
      class="btn btn-default col-sm-12 margin-top" id="${characters[i]._id}" onClick="loadCharacter('${characters[i]._id}')">
      <span class="pull-left">${characters[i].FirstName} ${characters[i].LastName}</span>
      <span class="pull-right">${characters[i].Level}</span>
      </button>`);
    }

  });
}

function getCharacterSheetValues() {
  var values = [];
  // First Panel - Character Information
  values.push($("#formFirstName").val()) // 0
  values.push($("#formLastName").val())
  values.push($("#formAlignment").val())
  values.push($("#formLevel").val())
  values.push($("#formDeity").val())
  values.push($("#formHomeland").val())
  values.push($("#formRace").val()) // 6
  values.push($("#formSize").val())
  values.push($("#formAge").val())
  values.push($("#formHeight").val())
  values.push($("#formWeight").val())
  values.push($("#formHair").val())
  values.push($("#formEyes").val()) //12
  // Second Panel - Ability Scores
  // STR - 13 / Dex - 14 / Con - 15 / Int - 16 / Wis - 17 / Cha - 18
  var builder = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
  for (i = 0; i < builder.length; i++) {
    var arr = [];
    arr.push($(`#form${builder[i]}As`).val())
    arr.push($(`#form${builder[i]}Mod`).val())
    arr.push($(`#form${builder[i]}TempAdj`).val())
    arr.push($(`#form${builder[i]}TempMod`).val())
    values.push(arr);
  }
  // Health 19
  var builder = ["Total", "Current", "NonLethal"];
  var arr = [];
  for (i = 0; i < builder.length; i++) {
    arr.push($(`#formHP${builder[i]}`).val());
  }
  values.push(arr);
  // Speed 20
  var builder = ["Base", "Armor", "Fly", "Swim", "Climb", "Burrow"];
  var arr = [];
  for (i = 0; i < builder.length; i++) {
    arr.push($(`#formSpeed${builder[i]}`).val());
  }
  values.push(arr);
  // Initiative 21
  values.push($("#formInitiative").val());
  // Armor Class - 22
  var builder = ["Class", "Touch", "FlatFoot"];
  var arr = [];
  for (i = 0; i < builder.length; i++) {
    arr.push($(`#formArmor${builder[i]}`).val());
  }
  values.push(arr);
  return values;
}

function saveCharacter(values) {
  // First, Last
  db.addCharacter(values[0], values[1]);
  db.getCharacterID(values[0], values[1], function(id) {
    db.setFirstName(id, values[0]);
    db.setLastName(id, values[1]);
    db.setAlignment(id, values[2]);
    db.setLevel(id, values[3]);
    db.setDeity(id, values[4]);
    db.setHomeland(id, values[5]);
    db.setRace(id, values[6]);
    db.setSize(id, values[7]);
    db.setAge(id, values[8]);
    db.setHeight(id, values[9]);
    db.setWeight(id, values[10]);
    db.setHair(id, values[11]);
    db.setEyes(id, values[12]);
    db.setStrength(id, values[13]);
    db.setDexterity(id, values[14]);
    db.setConstitution(id, values[15]);
    db.setIntelligence(id, values[16]);
    db.setWisdom(id, values[17]);
    db.setCharisma(id, values[18]);
    db.setHealth(id, values[19]);
    db.setSpeed(id, values[20]);
    db.setInitiative(id, values[21]);
    db.setArmorClass(id, values[22]);
  });
}

/** Load Character Buttons **/
function loadCharacter(id) {
  playButtonClick();
  console.log(id);
}


/** Nav Handler */
$("button").click(function() {
  playButtonClick();
  let id = $(this).attr('id');
  switch (id) {
    case "showPanelHome":
      showTab("panelHome", id);
      break;
    case "showPanelDiceTool":
      showTab("panelDiceTool", id);
      break;
    case "showPanelNewCharacterSheet":
      showTab("panelNewCharacterSheet");
      break;
    case "showPanelLoadCharacter":
      $('#characterLoadingPanel').empty();
      getAllCharacters();
      showTab("panelLoadCharacter");
      break;
    // New Character Sheet Panel
    case "saveSheet":
      saveCharacter(getCharacterSheetValues());
      break;
    // Dice Window
    case "d20":
      rollDice(20);
      break;
    case "d12":
      rollDice(12);
      break;
    case "d10":
      rollDice(10);
      break;
    case "d8":
      rollDice(8);
      break;
    case "d6":
      rollDice(6);
      break;
    case "d4":
      rollDice(4);
      break;
    case "clearResults":
      clearResults();
      break;
    case "percentileDice":
      rollPercentile();
      break;
    case "flipCoin":
      flipCoin();
      break;
    // Black Jack
    case "dealBlackJack":
      dealBlackJack();
      break;
    case "hitBlackJackDealer":
      addCardTo(blackJackDealer);
      checkBlackJackResults();
      break;
    case "hitBlackJackOpponent":
      addCardTo(blackJackOpponent);
      checkBlackJackResults();
      break;
    case "calculateBlackJackWinner":
      calculateBlackJackResults();
      break;
    // Duel Asset
    case "duelGenerate":
      duelGenerate();
      break;
    case "duelNextRound":
      duelNextRound();
      break;
    // Checks
    case "beatEasyCheck":
      rollDiceMinMax(1,10);
      break;
    case "beatMediumCheck":
        rollDiceMinMax(5,15);
        break;
    case "beatHardCheck":
        rollDiceMinMax(10,20);
        break;
    case "beatImpossibleCheck":
        rollDiceMinMax(15,25);
        break;
    // Toolbar
    case "exitApp":
      exitApp();
      break;
    case "minApp":
      minApp();
      break;
    case "maxApp":
      maxApp();
      break;
    // End Nav
  }
});

/**************************
/** AUDIO FUNCTIONS **/
/** Button Sound Effect **/
function playButtonClick() {
  let audio = new Audio('audio/select.wav');
  audio.play();
}

function playRewardSound() {
  let audio = new Audio('audio/reward.wav');
  audio.play();
}

function playFailureSound() {
  let audio = new Audio('audio/decline.wav');
  audio.play();
}

function playCriticalSound() {
  let audio = new Audio('audio/critical.wav');
  audio.play();
}

/**************************
/** Title Bar Functions ***
/*************************/
function exitApp() {
  window.close();
}

function minApp() {
  const { remote } = require('electron');
  remote.BrowserWindow.getFocusedWindow().minimize();
}

function maxApp() {
  const { remote } = require('electron');
  var currentWindow = remote.BrowserWindow.getFocusedWindow();
  if (currentWindow.isMaximized()) {
    currentWindow.unmaximize();
  } else {
    currentWindow.maximize();
  }
}

/*********************************
/* TAB function
/********************************/
function showTab(element, lastButton) {
  $('button').removeClass('active');
  $(`#${lastButton}`).addClass('active');

  $(".side-tab").hide();
  $(`#${element}`).show();
}

/*************************
/*  Roll Dice Functions
/************************/
var diceResultCount = 0;

function rollDice(number) {
  checkDiceResultCount();
  let result;
  result = getRandomDiceResult(number);
  $('#resultTable').append(`<tr><td><span class="pull-left">D${number}:</span> <span class="pull-right">${result}</span></td></tr>`);
  $('#resultTable tr').removeClass('active-result');

  // D20 Effects
  if (number === 20) {
    switch (result) {
      case 20:
        playRewardSound();
        $('#resultTable tr:last').addClass('active-result-d20');
        break;
      case 1:
        playFailureSound();
        $('#resultTable tr:last').addClass('active-result-d1');
        break;
      default:
        $('#resultTable tr:last').addClass('active-result');
        break;
    }
  }
}

function rollDiceMinMax(min, max) {
  checkDiceResultCount();
  let result = Math.floor((Math.random() * max) + min);
  $('#resultTable').append(`<tr><td><span class="pull-left">Check:</span> <span class="pull-right">${result}</span></td></tr>`);
  $('#resultTable tr').removeClass('active-result');
  $('#resultTable tr:last').addClass('active-result');
}

function rollPercentile() {
  checkDiceResultCount();
  let result = getRandomDiceResult(100);
  $('#resultTable').append(`<tr><td><span class="pull-left">Percentile:</span> <span class="pull-right">${result}%</span></td></tr>`);
  $('#resultTable tr').removeClass('active-result');
  $('#resultTable tr:last').addClass('active-result');
}

function checkDiceResultCount() {
  if (diceResultCount > 16) {
    clearResults();
    diceResultCount = 0;
  } else {
    diceResultCount++;
  }
}

function getRandomDiceResult(sides) {
  return Math.floor((Math.random() * sides) + 1);
}

/********************************
/ Coin Flip
/*******************************/
function flipCoin() {
  let result = generateFlip();
  $('#resultTable').append(`<tr><td><span class="pull-left">Coin Flip:</span><span class="pull-right">${result}</span></td></tr>`);
  $('#resultTable tr').removeClass('active-result');
  $('#resultTable tr:last').addClass('active-result');
}

function generateFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'Heads' : 'Tails';
}

/********************************
/ Duel
/*******************************/
var enemyHealthA;
var enemyHealthB;
var duelResultCount = 0;

function duelGenerate() {
  duelResultCount = 0;
  clearResults();
  enemyHealthA = Math.floor(Math.random() * 100) + 50;
  enemyHealthB = Math.floor(Math.random() * 100) + 50;
  duelDisplayHealth();
}

function duelDisplayHealth() {
  $('#resultTable').append(`<tr><td><span class="pull-left">Prisoner 1</span> <span class="pull-right">Health: ${enemyHealthA}</span></td></tr>`);
  $('#resultTable tr:last').addClass('active-result-duel-enemy');
  $('#resultTable').append(`<tr><td><span class="pull-left">Prisoner 2</span> <span class="pull-right">Health: ${enemyHealthB}</span></td></tr>`);
  $('#resultTable tr:last').addClass('active-result-duel-enemy-alt');
}

// Who got hit, A or B, 0 or 1.
function displayCritical(value) {
  playCriticalSound();
  switch(value) {
    case 0:
      $('#resultTable').append(`<tr><td><span class="pull-left">Prisoner 1 took a critical hit.</span></td></tr>`);
      $('#resultTable tr:last').addClass('active-result-d1');
      return;
    case 1:
      $('#resultTable').append(`<tr><td><span class="pull-left">Prisoner 2 took a critical hit.</span></td></tr>`);
      $('#resultTable tr:last').addClass('active-result-d1');
      return;
  }
}

function duelNextRound() {
  checkDuelResultCount();
  let prisonerDice = getRandomDiceResult(20);
  if (prisonerDice === 20) {
      enemyHealthA -= Math.floor(Math.random() * 25 + 1) * 2;
      displayCritical(0);
  } else {
    enemyHealthA -= Math.floor(Math.random() * 25 + 1);
  }

  prisonerDice = getRandomDiceResult(20);
  if (prisonerDice === 20) {
      enemyHealthB -= Math.floor(Math.random() * 25 + 1) * 2;
      displayCritical(1);
  } else {
    enemyHealthB -= Math.floor(Math.random() * 25 + 1);
  }

  if (checkHealth()) {
    return;
  }

  duelDisplayHealth();
}

function checkHealth() {
  if (enemyHealthA <= 0 && enemyHealthB <= 0) {
    $('#resultTable').append(`<tr><td><span class="pull-left">It's a draw, both prisoners died.</span></td></tr>`);
    $('#resultTable tr:last').addClass('active-result-d1');
    return true;
  }

  if (enemyHealthA <= 0) {
    $('#resultTable').append(`<tr><td><span class="pull-left">Prisoner 2 wins.</span></td></tr>`);
    $('#resultTable tr:last').addClass('active-result-d20');
    playRewardSound();
    return true;
  }

  if (enemyHealthB <= 0) {
    $('#resultTable').append(`<tr><td><span class="pull-left">Prisoner 1 wins.</span></td></tr>`);
    $('#resultTable tr:last').addClass('active-result-d20');
    playRewardSound();
    return true;
  }

  return false;
}

function checkDuelResultCount() {
  if (duelResultCount > 5) {
    clearResults();
    duelResultCount = 0;
  } else {
    duelResultCount++;
  }
}

/********************************
/ BlackJack
/*******************************/
var blackJackOpponent = [];
var blackJackDealer = [];

function dealBlackJack() {
  cleanUpBlackJack();
  addCardTo(blackJackDealer);
  addCardTo(blackJackDealer);
  addCardTo(blackJackOpponent);
  addCardTo(blackJackOpponent);
  checkBlackJackResults();
}

function dealCard() {
  var card = Math.floor(Math.random() * 52 + 1) % 13;

  let finalResult;

  if (card > 10 || card === 0) {
    finalResult = 10;
  } else if (card === 1) {
    finalResult = 11;
  } else {
    finalResult = card;
  }

  return finalResult;
}

function addCardTo(arr) {
  var card = dealCard();
  arr.push(card);

  let opposition;

  if (arr === blackJackOpponent) {
    opposition = "Opponent";
    $('#resultTable').append(`<tr><td><span class="pull-left">${opposition}:</span> <span class="pull-right">${card}</span></td></tr>`);
    $('#resultTable tr:last').addClass('active-result-bj-opposition');
  } else {
    opposition = "Dealer";
    $('#resultTable').append(`<tr><td><span class="pull-left">${opposition}:</span> <span class="pull-right">${card}</span></td></tr>`);
    $('#resultTable tr:last').addClass('active-result-bj-dealer');
  }
}

function cleanUpBlackJack() {
  blackJackOpponent = [];
  blackJackDealer = [];
  clearResults();
}

// If our opponent wins.
function pushBlackJackResult(value) {
  var blackJackBet = Number($('#blackJackBet').val());
  if (value === null) {
    $('#resultTable').append(`<tr><td><span class="pull-left">Push, no loss or win.</span></td></tr>`)
    $('#resultTable tr:last').addClass('active-result-bj-push');
    return;
  }

  if (value) {
    $('#resultTable').append(`<tr><td><span class="pull-left">Opponent wins ${blackJackBet * 2} currency.</span></td></tr>`)
    $('#resultTable tr:last').addClass('active-result-d20');
    playRewardSound();
  } else {
    $('#resultTable').append(`<tr><td><span class="pull-left">Opponent loses ${blackJackBet} currency.</span></td></tr>`)
    $('#resultTable tr:last').addClass('active-result-d1');
    playFailureSound();
  }
}

function countBlackJackHand(arr) {
  let total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

function checkForBust(opponent, dealer) {
  if (opponent > 21) {
    pushBlackJackResult(false);
    // If there's a result return true.
    return true;
  }

  if (dealer > 21) {
    pushBlackJackResult(true);
    return true;
  }
  return false;
}

function checkForPush(opponent, dealer) {
  if (opponent === dealer) {
    pushBlackJackResult(null);
    return true;
  }
  return false;
}

function checkForTwentyOne(opponent, dealer) {
  if (opponent === 21) {
    pushBlackJackResult(true);
    return true;
  }

  if (dealer === 21) {
    pushBlackJackResult(false);
    return true;
  }
  return false;
}

function calculateBlackJackResults() {
  let opponentTotal = countBlackJackHand(blackJackOpponent);
  let dealerTotal = countBlackJackHand(blackJackDealer);

  if (checkForBust(opponentTotal, dealerTotal)) {
    return;
  }

  if (checkForPush(opponentTotal, dealerTotal)) {
    return;
  }

  if (opponentTotal > dealerTotal) {
    pushBlackJackResult(true);
  } else {
    pushBlackJackResult(false);
  }
}

function checkBlackJackResults() {
  let opponentTotal = countBlackJackHand(blackJackOpponent);
  let dealerTotal = countBlackJackHand(blackJackDealer);

  var blackJackBet = Number($('#blackJackBet').val());

  if (checkForBust(opponentTotal, dealerTotal)) {
    return;
  }

  if (checkForPush(opponentTotal, dealerTotal)) {
    return;
  }

  if (checkForTwentyOne(opponentTotal, dealerTotal)) {
    return;
  }

  if (dealerTotal < 21 && opponentTotal < 21) {
    $('#resultTable').append(`<tr><td><span class="pull-left">Dealer Total:</span> <span class="pull-right">${dealerTotal}</span></td></tr>`);
    $('#resultTable tr:last').addClass('active-result-bj-total');
    $('#resultTable').append(`<tr><td><span class="pull-left">Opponent Total:</span> <span class="pull-right">${opponentTotal}</span></td></tr>`);
    $('#resultTable tr:last').addClass('active-result-bj-total-alt');
    return;
  }
}

function clearResults() {
  $('#resultTable').children('tr').remove();
}
