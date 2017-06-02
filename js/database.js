// Initialize our database.
var Datastore = require('nedb');
var characterDB = new Datastore({ filename: 'db/characters.db', autoload: true });
// Database is initialized in db/characters.db
module.exports = {
  /** CREATE CHARACTER FUNCTIONS */
  // Call this first if you want to add a new character.
  addCharacter: function(first, last) {
    var character = { "FirstName": first, "LastName": last };
    characterDB.insert(character, function(err, newDoc) {});
  },
  /** GET CHARACTER INFO FUNCTIONS */
  getCharacter: function(first, last, fnc) {
    characterDB.find({ FirstName: `${first}`, LastName: `${last}`}, function(err, docs) {
      fnc(docs);
    });
  },
  getCharacterID: function(first, last, fnc) {
    characterDB.find({ FirstName: `${first}`, LastName: `${last}`}, function(err, docs) {
      fnc(docs[0]._id);
    });
  },
  /** Returns all characters to a callback. */
  getAllCharacters: function(fnc) {
    characterDB.find({}, function(err, docs) {
      fnc(docs);
    });
  },
  /** UPDATE CHARACTER FUNCTIONS */
  setFirstName: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { FirstName: `${value}` }}, function(err, numReplaced) {});
  },
  setLastName: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { LastName: `${value}` }}, function(err, numReplaced) {});
  },
  setAlignment: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Alignment: `${value}` }}, function(err, numReplaced) {});
  },
  setLevel: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Level: `${value}` }}, function(err, numReplaced) {});
  },
  setDeity: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Deity: `${value}` }}, function(err, numReplaced) {});
  },
  setHomeland: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Homeland: `${value}` }}, function(err, numReplaced) {});
  },
  setRace: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Race: `${value}` }}, function(err, numReplaced) {});
  },
  setSize: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Size: `${value}` }}, function(err, numReplaced) {});
  },
  setAge: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Age: `${value}` }}, function(err, numReplaced) {});
  },
  setHeight: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Height: `${value}` }}, function(err, numReplaced) {});
  },
  setWeight: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Weight: `${value}` }}, function(err, numReplaced) {});
  },
  setHair: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Hair: `${value}` }}, function(err, numReplaced) {});
  },
  setEyes: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Eyes: `${value}` }}, function(err, numReplaced) {});
  },
  setStrength: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      StrAs: `${values[0]}`,
      StrMod: `${values[1]}`,
      StrTempAdj: `${values[2]}`,
      StrTempMod: `${values[3]}`
      }}, function(err, numReplaced) {});
  },
  setDexterity: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      DexAs: `${values[0]}`,
      DexMod: `${values[1]}`,
      DexTempAdj: `${values[2]}`,
      DexTempMod: `${values[3]}`
      }}, function(err, numReplaced) {});
  },
  setConstitution: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      ConAs: `${values[0]}`,
      ConMod: `${values[1]}`,
      ConTempAdj: `${values[2]}`,
      ConTempMod: `${values[3]}`
      }}, function(err, numReplaced) {});
  },
  setIntelligence: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      IntAs: `${values[0]}`,
      IntMod: `${values[1]}`,
      IntTempAdj: `${values[2]}`,
      IntTempMod: `${values[3]}`
      }}, function(err, numReplaced) {});
  },
  setWisdom: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      WisAs: `${values[0]}`,
      WisMod: `${values[1]}`,
      WisTempAdj: `${values[2]}`,
      WisTempMod: `${values[3]}`
      }}, function(err, numReplaced) {});
  },
  setCharisma: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      ChaAs: `${values[0]}`,
      ChaMod: `${values[1]}`,
      ChaTempAdj: `${values[2]}`,
      ChaTempMod: `${values[3]}`
      }}, function(err, numReplaced) {});
  },
  setHealth: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      HPTotal: `${values[0]}`,
      HPCurrent: `${values[1]}`,
      HPNonLethal: `${values[2]}`
      }}, function(err, numReplaced) {});
  },
  setSpeed: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      SpeedBase: `${values[0]}`,
      SpeedArmor: `${values[1]}`,
      SpeedFly: `${values[2]}`,
      SpeedSwim: `${values[3]}`,
      SpeedClimb: `${values[4]}`,
      SpeedBurrow: `${values[5]}`
      }}, function(err, numReplaced) {});
  },
  setInitiative: function(target, value) {
    characterDB.update({ _id: `${target}` }, {$set: { Initiative: `${value}` }}, function(err, numReplaced) {});
  },
  setArmorClass: function(target, values) {
    characterDB.update({ _id: `${target}` }, {$set: {
      ArmorClass: `${values[0]}`,
      ArmorTouch: `${values[1]}`,
      ArmorFlatFoot: `${values[2]}`
      }}, function(err, numReplaced) {});
  },
}
