/** 1. Installing and setting up Mongoose **/
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser")

// Connect to the database using the MONGO_URI from your .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database connection error:", err));

/** 2. Create a person prototype (Schema) **/
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // name is a string and is required
  age: Number, // age is a number
  favoriteFoods: [String], // array of strings
});

// Create the Person model from the schema
const Person = mongoose.model("Person", personSchema);

/** 3. Create and Save a Record of a Model **/
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Sushi"],
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/** 4. Create Many Records with model.create() **/
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

/** 5. Use model.find() to Search Your Database **/
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

/** 6. Use model.findOne() to Return a Single Matching Document **/
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/** 7. Use model.findById() to Search Your Database By _id **/
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/** 8. Perform Classic Updates by Running Find, Edit, then Save **/
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    // Add "hamburger" to the list of favorites
    person.favoriteFoods.push(foodToAdd);

    // Save the updated person
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

/** 9. Perform New Updates on a Document Using model.findOneAndUpdate() **/
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }, // Return the updated document
    (err, updatedDoc) => {
      if (err) return console.error(err);
      done(null, updatedDoc);
    },
  );
};

/** 10. Delete One Document Using model.findByIdAndRemove **/
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.error(err);
    done(null, removedDoc);
  });
};

/** 11. Delete Many Documents with model.remove() **/
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.error(err);
    done(null, response);
  });
};

/** 12. Chain Search Query Helpers to Narrow Search Results **/
const queryChain = (done) => {
  const foodToSearch = "burritos";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // Sort by name (ascending)
    .limit(2) // Limit results to two
    .select({ age: 0 }) // Hide age
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};

// Remove the { useNewUrlParser: true, useUnifiedTopology: true } part
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Database connection error:", err));
// Export functions for submission/tests
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
