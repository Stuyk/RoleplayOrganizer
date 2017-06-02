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
    characterDB.update({ FirstName: `${target}` }, {$set: { Hair: `${value}` }}, function(err, numReplaced) {});
  },
  setEyes: function(target, value) {
    characterDB.update({ FirstName: `${target}` }, {$set: { Eyes: `${value}` }}, function(err, numReplaced) {});
  }
}
