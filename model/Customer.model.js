const mongoose = require('mongoose');
const bookSchema = require('./Book.schema');

const cusSchema =  new mongoose.Schema({
    email: { type: String, unique: true },
    books: [bookSchema] // a field that is an array of book Schemas 
  });

  const userModel = mongoose.model('customers',cusSchema);
// a way of populating data=>seedCusCollection
  const seedCusCollection = () => {
    try { // this try catch method is to safely add new users to the DB, and if the user already exists it wont crash our application
      const firstCust = new userModel({
        email: "jamalwari@ymail.com",
        books: [
          {
            title: "In Search of Lost Time ",
            description: "Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work.",
            status: "1st on El Pais Favorite Books of 100 Spanish Authors (El Pais)"
          },
          {
            title: "Ulysses",
            description: "Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses)",
            status: " 1st on The Greatest 20th Century Novels (Waterstone)"
          },
        ]
      });
      const secondCust = new userModel({
        email: "jamalwari24@gmail.com",
        books: [
          {
            title: "One Hundred Years of Solitude",
            description: "One of the 20th century's enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world, and the ultimate achievement in a Nobel Prize–winning career.",
            status: "1st on 25 acclaimed international writers choose 25 of the best books from the last 25 years (Wasafiri Magazine)"
          },
          {
            title: " Don Quixote",
            description: "Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry",
            status: "1st on The 100 Best Books of World Literature (ABC.es)"
          },
        ]
      });
      firstCust.save();
      secondCust.save();
  } catch (e) {
    console.log("Error while creating the user: ", e.message)
  }
};
module.exports ={
  userModel,
  seedCusCollection

}