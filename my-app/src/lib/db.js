import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

console.log('DB: Initializing database connection');

let client;
let db;

async function initDb() {
    try {
        client = new MongoClient(DB_URI);
        await client.connect();
        console.log('DB: Successfully connected to MongoDB');
        db = client.db("zooDB");
        return true;
    } catch (err) {
        console.error('DB: Failed to connect to MongoDB:', err);
        return false;
    }
}

// Initialize connection
await initDb();

//////////////////////////////////////////
// Animals
//////////////////////////////////////////

// Get all animals
export async function getAnimals() {
    let animals = [];
    try {
        if (!db) {
            console.log('DB: Reconnecting to database...');
            await initDb();
        }
        console.log('DB: Attempting to get all animals');
        const collection = db.collection("animals");
        const query = {};
        animals = await collection.find(query).toArray();
        console.log('DB: Found', animals.length, 'animals');
        console.log('DB: Raw animals from database:', animals);
        
        animals.forEach((animal) => {
            animal._id = animal._id.toString();
        });
        console.log('DB: Processed animals:', animals);
    } catch (error) {
        console.error('DB: Error getting animals:', error);
        throw error; // Propagate error up
    }
    return animals;
}

// Get animal by id
export async function getAnimal(id) {
    let animal = null;
    try {
        if (!db) {
            console.log('DB: Reconnecting to database...');
            await initDb();
        }
        console.log('DB: Getting animal with ID:', id);
        const collection = db.collection("animals");
        const query = { _id: new ObjectId(id) };
        animal = await collection.findOne(query);
        
        if (!animal) {
            console.log("DB: No animal with id " + id);
        } else {
            animal._id = animal._id.toString();
            console.log('DB: Found animal:', animal);
        }
    } catch (error) {
        console.error('DB: Error getting animal:', error);
        throw error;
    }
    return animal;
}

// Get highest animal ID
async function getHighestAnimalId() {
    try {
        if (!db) {
            console.log('DB: Reconnecting to database...');
            await initDb();
        }
        const collection = db.collection("animals");
        const animals = await collection.find({}).toArray();
        
        if (!animals || animals.length === 0) {
            console.log('DB: No existing animals, starting with ID 1');
            return 0;
        }
        
        // Find highest id, accounting for animals that might not have an id
        const highestId = Math.max(...animals.map(animal => animal.id || 0));
        console.log('DB: Current highest animal ID:', highestId);
        return highestId;
    } catch (error) {
        console.error('DB: Error getting highest animal ID:', error);
        throw error;
    }
}

// create animal
export async function createAnimal(animal) {
    try {
        if (!db) {
            console.log('DB: Reconnecting to database...');
            await initDb();
        }
        
        // Get and assign next available ID
        const highestId = await getHighestAnimalId();
        animal.id = highestId + 1;
        console.log('DB: Assigning new animal ID:', animal.id);
        
        console.log('DB: Creating new animal:', animal);
        animal.image = "/images/placeholder.jpg"; // default image
        const collection = db.collection("animals");
        const result = await collection.insertOne(animal);
        console.log('DB: Created animal with ID:', result.insertedId);
        return result.insertedId.toString();
    } catch (error) {
        console.error('DB: Error creating animal:', error);
        throw error;
    }
}

// update animal
export async function updateAnimal(id, updates) {
    try {
        console.log('DB: Updating animal with ID:', id);
        console.log('DB: Update data:', updates);
        
        const collection = db.collection("animals");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );
        
        console.log('DB: Update result:', result);
        
        if (result.modifiedCount === 0) {
            console.log('DB: No animal was updated');
            throw new Error('No animal was updated');
        }
        
        console.log('DB: Animal updated successfully');
        return result;
    } catch (err) {
        console.error('DB: Error in updateAnimal:', err);
        throw err;
    }
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
export async function getZookeepers() {
    let zookeepers = [];
    try {
        if (!db) {
            console.log('DB: Reconnecting to database...');
            await initDb();
        }
        console.log('DB: Getting all zookeepers');
        const collection = db.collection("zookeepers");
        const query = {};
        zookeepers = await collection.find(query).toArray();
        console.log('DB: Found', zookeepers.length, 'zookeepers');
        
        zookeepers.forEach((keeper) => {
            keeper._id = keeper._id.toString();
        });
        console.log('DB: Processed zookeepers:', zookeepers);
    } catch (error) {
        console.error('DB: Error getting zookeepers:', error);
        throw error;
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
export {
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
