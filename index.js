const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
console.log(process.env.MONGO_URI);
//connecting to the DB
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err.message));
// Schema
const personSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: {
    type: [String],
    required: true,
  },
});
// Model
const Person = mongoose.model("person", personSchema);

// Create Contact (create document)
const createPerson = async () => {
  const person = new Person({
    fullName: "Jane Doe",
    age: 25,
    favoriteFoods: ["lasagne, pizza, spagetti"],
  });

  try {
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.error("Error:", err.message);
  }
};
createPerson();
// Create many contacts
const createManyPersons = async (persons) => {
  try {
    const result = await Person.create(persons);
    console.log(result);
  } catch (err) {
    console.error("Error:", err.message);
  }
};
createManyPersons([
  {
    fullName: "john Doe",
    age: 30,
    favoriteFoods: ["lasagne, hamburger, sandwich"],
  },
  {
    fullName: "ellie bamber ",
    age: 22,
    favoriteFoods: ["cheesecake, seafood, strawberry"],
  },
  {
    fullName: "ruby cruz ",
    age: 23,
    favoriteFoods: ["chocolate, ice cream "],
  },
]);

// Get persons
const getPersons = async () => {
  try {
    // const persons = await Person.find().sort('-age').limit(2);
    const persons = await Person.find({ _id: "641738b9b3511944cad47a1e" });
    console.log(persons);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

// Update Contact
const updatePerson = async (id, newAge) => {
  try {
    // Query First
    // const person= await Person.findById(id);
    // person.age = newAge;
    // const result = await person.save()
    // console.log(result)

    // Update first
    // const result = await Person.updateOne({_id:id}, {$set:{age: newAge}});
    // console.log(result)
    const person = await Person.findByIdAndUpdate(
      id,
      { $set: { age: newAge } },
      { new: true }
    );
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

// Remove Contact
const removePerson = async (id) => {
  try {
    // const result = await Person.deleteOne({_id:id});
    // console.log(result);
    const person = await Person.findByIdAndRemove(id);
    console.log(person);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

removePerson("6419719ca9fcbc1139bb7d27");
updatePerson("6419719ca9fcbc1139bb7d26", 20);
getPersons();
