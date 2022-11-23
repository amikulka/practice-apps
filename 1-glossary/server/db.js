const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

const termsSchema = new mongoose.Schema({
  term: String,
  definition: String
})
const Terms = mongoose.model('Terms', termsSchema);

module.exports.addTerm = (term, definition) => {
  //add word to db
  return Terms.create({
    term: term,
    definition:definition
  })
  .catch(err => {console.log(err)});

}

module.exports.readTerms = () => {
  // read all words
  return Terms.find()
    .catch(err => {console.log(err)});
}

module.exports.updateTerm = (term, newDefinition) => {
  //update word with a new definiton
  return new Promise(() => {
    return Terms.findOneandUpdate({term}, {definition: newDefinition});
  })
  .catch(err => {console.log(err)});
}

module.exports.deleteTerm = (term) => {
    // delete word
    return new Promise(() => {
      return Terms.deleteOne({term});
    })
    .then(success => {
      console.log(success.deletedCount);
    })
    .catch(err => {console.log(err)});
}



// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
