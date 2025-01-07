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
            return 0;
        }
        
        const highestId = Math.max(...animals.map(animal => animal.id || 0));
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
        
        // Initialize empty zookeeper_ids array
        animal.zookeeper_ids = [];
        
        // Set default image
        animal.image = "/images/placeholder.jpg";
        
        const collection = await getCollection("animals");
        const result = await collection.insertOne(animal);
        return result.insertedId.toString();
    } catch (error) {
        console.error('DB: Error creating animal:', error);
        throw error;
    }
}

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

        return await getAnimal(id);
    } catch (error) {
        console.error('DB: Error updating animal:', error);
        throw error;
    }
}

export async function deleteAnimal(id) {
    try {
        const animal = await getAnimal(id);
        if (!animal) {
            return null;
        }

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

// New functions for managing zookeeper assignments

export async function getAnimalZookeepers(animalId) {
    try {
        const animal = await getAnimal(animalId);
        if (!animal) {
            throw new Error('Animal not found');
        }

        // If zookeeper_ids doesn't exist or is not an array, return empty array
        if (!animal.zookeeper_ids || !Array.isArray(animal.zookeeper_ids)) {
            // Update the animal to include empty zookeeper_ids array
            await updateAnimal(animalId, { zookeeper_ids: [] });
            return [];
        }

        // If there are no assigned zookeepers, return empty array
        if (animal.zookeeper_ids.length === 0) {
            return [];
        }

        const zookeepersCollection = await getCollection("zookeepers");
        const zookeepers = await zookeepersCollection
            .find({ _id: { $in: animal.zookeeper_ids.map(id => new ObjectId(id)) } })
            .toArray();

        return zookeepers.map(zookeeper => {
            zookeeper._id = zookeeper._id.toString();
            return zookeeper;
        });
    } catch (error) {
        console.error('DB: Error getting animal zookeepers:', error);
        throw error;
    }
}

export async function addZookeeperToAnimal(animalId, zookeeperId) {
    try {
        const collection = await getCollection("animals");
        const result = await collection.updateOne(
            { _id: new ObjectId(animalId) },
            { $addToSet: { zookeeper_ids: zookeeperId } }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Failed to assign zookeeper to animal');
        }

        return true;
    } catch (error) {
        console.error('DB: Error adding zookeeper to animal:', error);
        throw error;
    }
}

export async function removeZookeeperFromAnimal(animalId, zookeeperId) {
    try {
        const collection = await getCollection("animals");
        const result = await collection.updateOne(
            { _id: new ObjectId(animalId) },
            { $pull: { zookeeper_ids: zookeeperId } }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Failed to remove zookeeper from animal');
        }

        return true;
    } catch (error) {
        console.error('DB: Error removing zookeeper from animal:', error);
        throw error;
    }
} 