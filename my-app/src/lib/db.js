import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("zooDB"); // Changed to zooDB

//////////////////////////////////////////
// Animals
//////////////////////////////////////////

// Get all animals
async function getAnimals() {
  let animals = [];
  try {
    const collection = db.collection("animals");
    const query = {};
    animals = await collection.find(query).toArray();
    animals.forEach((animal) => {
      animal._id = animal._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return animals;
}

// Get animal by id
async function getAnimal(id) {
  let animal = null;
  try {
    const collection = db.collection("animals");
    const query = { _id: new ObjectId(id) };
    animal = await collection.findOne(query);
    if (!animal) {
      console.log("No animal with id " + id);
    } else {
      animal._id = animal._id.toString();
    }
  } catch (error) {
    console.log(error.message);
  }
  return animal;
}

// create animal
async function createAnimal(animal) {
  animal.image = "/images/placeholder.jpg"; // default image
  try {
    const collection = db.collection("animals");
    const result = await collection.insertOne(animal);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// update animal
async function updateAnimal(animal) {
  try {
    let id = animal._id;
    delete animal._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("animals");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: animal });

    if (result.matchedCount === 0) {
      console.log("No animal with id " + id);
    } else {
      console.log("Animal with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// delete animal by id
async function deleteAnimal(id) {
  try {
    const collection = db.collection("animals");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No animal with id " + id);
    } else {
      console.log("Animal with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

//////////////////////////////////////////
// Movies
//////////////////////////////////////////

// Get all movies
async function getMovies() {
  let movies = [];
  try {
    const collection = db.collection("movies");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    movies = await collection.find(query).toArray();
    movies.forEach((movie) => {
      movie._id = movie._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return movies;
}

// Get movie by id
async function getMovie(id) {
  let movie = null;
  try {
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) }; // filter by id
    movie = await collection.findOne(query);

    if (!movie) {
      console.log("No movie with id " + id);
      // TODO: errorhandling
    } else {
      movie._id = movie._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return movie;
}

// create movie
// Example movie object:
/* 
{ 
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten"
} 
*/
async function createMovie(movie) {
  movie.poster = "/images/placeholder.jpg"; // default poster
  movie.actors = [];
  movie.watchlist = false;
  try {
    const collection = db.collection("movies");
    const result = await collection.insertOne(movie);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// update movie
// Example movie object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten",
  actors: [
    "Lena Herzog",
    "Maximilian Schröder",
    "Sophia Neumann"
  ],
  poster: "/images/Altura.png",
  watchlist: false
} 
*/
// returns: id of the updated movie or null, if movie could not be updated
async function updateMovie(movie) {
  try {
    let id = movie._id;
    delete movie._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: movie });

    if (result.matchedCount === 0) {
      console.log("No movie with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Movie with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete movie by id
// returns: id of the deleted movie or null, if movie could not be deleted
async function deleteMovie(id) {
  try {
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No movie with id " + id);
    } else {
      console.log("Movie with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

//////////////////////////////////////////
// Zookeepers
//////////////////////////////////////////

// Get all zookeepers
async function getZookeepers() {
    let zookeepers = [];
    try {
        const collection = db.collection("zookeepers");
        const query = {};
        zookeepers = await collection.find(query).toArray();
        zookeepers.forEach((keeper) => {
            keeper._id = keeper._id.toString();
        });
    } catch (error) {
        console.log(error);
    }
    return zookeepers;
}

// Get zookeeper by id
async function getZookeeper(id) {
    let zookeeper = null;
    try {
        const collection = db.collection("zookeepers");
        const query = { _id: new ObjectId(id) };
        zookeeper = await collection.findOne(query);
        if (!zookeeper) {
            console.log("No zookeeper with id " + id);
        } else {
            zookeeper._id = zookeeper._id.toString();
        }
    } catch (error) {
        console.log(error.message);
    }
    return zookeeper;
}

// create zookeeper
async function createZookeeper(zookeeper) {
    try {
        const collection = db.collection("zookeepers");
        const result = await collection.insertOne(zookeeper);
        return result.insertedId.toString();
    } catch (error) {
        console.log(error.message);
    }
    return null;
}

// Export both sets of functions
export default {
    // Animal functions
    getAnimals,
    getAnimal,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    // Zookeeper functions
    getZookeepers,
    getZookeeper,
    createZookeeper
};
