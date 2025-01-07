import { ObjectId } from "mongodb";
import { getDb, getCollection } from "./db-connection.js";

export async function getAnimals() {
    let animals = [];
    try {
        const collection = await getCollection("animals");
        const query = {};
        animals = await collection.find(query).toArray();
        console.log('DB: Found', animals.length, 'animals');
        
        animals.forEach((animal) => {
            animal._id = animal._id.toString();
        });
        console.log('DB: Processed animals:', animals);
    } catch (error) {
        console.error('DB: Error getting animals:', error);
        throw error;
    }
    return animals;
}

export async function getAnimal(id) {
    let animal = null;
    try {
        const collection = await getCollection("animals");
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

async function getHighestAnimalId() {
    try {
        const collection = await getCollection("animals");
        const animals = await collection.find({}).toArray();
        
        if (!animals || animals.length === 0) {
            console.log('DB: No existing animals, starting with ID 1');
            return 0;
        }
        
        const highestId = Math.max(...animals.map(animal => animal.id || 0));
        console.log('DB: Current highest animal ID:', highestId);
        return highestId;
    } catch (error) {
        console.error('DB: Error getting highest animal ID:', error);
        throw error;
    }
}

export async function createAnimal(animal) {
    try {
        const highestId = await getHighestAnimalId();
        animal.id = highestId + 1;
        console.log('DB: Assigning new animal ID:', animal.id);
        
        console.log('DB: Creating new animal:', animal);
        animal.image = "/images/placeholder.jpg"; // default image
        const collection = await getCollection("animals");
        const result = await collection.insertOne(animal);
        console.log('DB: Created animal with ID:', result.insertedId);
        return result.insertedId.toString();
    } catch (error) {
        console.error('DB: Error creating animal:', error);
        throw error;
    }
}

/**
 * Updates an animal in the database
 * @param {string} id - The ID of the animal to update
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object>} The updated animal
 */
export async function updateAnimal(id, updates) {
    try {
        const collection = await getCollection("animals");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Animal not found');
        }

        // Get and return the updated animal
        return await getAnimal(id);
    } catch (error) {
        console.error('DB: Error updating animal:', error);
        throw error;
    }
}

export async function deleteAnimal(id) {
    try {
        // First, get the animal to check if it exists
        const animal = await getAnimal(id);
        if (!animal) {
            return null;
        }

        // Get the zookeepers collection to update assigned zookeepers
        const zookeepersCollection = await getCollection("zookeepers");
        
        // Remove animal_id from any zookeepers assigned to this animal
        await zookeepersCollection.updateMany(
            { animal_id: animal.id },
            { $unset: { animal_id: "" } }
        );

        // Now delete the animal
        const collection = await getCollection("animals");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return null;
        }

        return id;
    } catch (error) {
        console.error('DB: Error deleting animal:', error);
        throw error;
    }
} 