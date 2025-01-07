import { ObjectId } from "mongodb";
import { getDb, getCollection } from "./db-connection.js";
import { getAnimal } from "./animals.js";

export async function getZookeepers() {
    let zookeepers = [];
    try {
        const collection = await getCollection("zookeepers");
        const query = {};
        zookeepers = await collection.find(query).toArray();
        
        zookeepers.forEach((zookeeper) => {
            zookeeper._id = zookeeper._id.toString();
        });
        return zookeepers;
    } catch (error) {
        console.error('DB: Error getting zookeepers:', error);
        throw error;
    }
}

export async function getZookeeper(id) {
    try {
        const collection = await getCollection("zookeepers");
        const zookeeper = await collection.findOne({ _id: new ObjectId(id) });
        if (zookeeper) {
            zookeeper._id = zookeeper._id.toString();
        }
        return zookeeper;
    } catch (error) {
        console.error('DB: Error getting zookeeper:', error);
        throw error;
    }
}

export async function createZookeeper(zookeeper) {
    try {
        const collection = await getCollection("zookeepers");
        const result = await collection.insertOne(zookeeper);
        return result.insertedId.toString();
    } catch (error) {
        console.error('DB: Error creating zookeeper:', error);
        throw error;
    }
}

export async function updateZookeeper(id, updates) {
    try {
        const collection = await getCollection("zookeepers");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Zookeeper not found');
        }

        return await getZookeeper(id);
    } catch (error) {
        console.error('DB: Error updating zookeeper:', error);
        throw error;
    }
}

export async function deleteZookeeper(id) {
    try {
        const zookeeper = await getZookeeper(id);
        if (!zookeeper) {
            return null;
        }

        // Get the animals collection to update assigned animals
        const animalsCollection = await getCollection("animals");
        
        // Remove this zookeeper's ID from any animals it's assigned to
        await animalsCollection.updateMany(
            { zookeeper_ids: id },
            { $pull: { zookeeper_ids: id } }
        );

        // Delete the zookeeper
        const collection = await getCollection("zookeepers");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return null;
        }

        return id;
    } catch (error) {
        console.error('DB: Error deleting zookeeper:', error);
        throw error;
    }
}

// New function to get all animals assigned to a zookeeper
export async function getZookeeperAssignedAnimals(zookeeperId) {
    try {
        const animalsCollection = await getCollection("animals");
        const animals = await animalsCollection
            .find({ zookeeper_ids: zookeeperId })
            .toArray();

        return animals.map(animal => {
            animal._id = animal._id.toString();
            return animal;
        });
    } catch (error) {
        console.error('DB: Error getting zookeeper assigned animals:', error);
        throw error;
    }
}

export async function assignAnimalToZookeeper(zookeeperId, animalId) {
    try {
        // Get current zookeeper to check if they have an existing animal
        const zookeeper = await getZookeeper(zookeeperId);
        const currentAnimalId = zookeeper.animal_id;

        // If there's an existing animal, remove zookeeper from its zookeeper_ids
        if (currentAnimalId) {
            const animalsCollection = await getCollection("animals");
            await animalsCollection.updateOne(
                { _id: new ObjectId(currentAnimalId) },
                { $pull: { zookeeper_ids: zookeeperId } }
            );
        }

        // Update zookeeper with new animal_id
        const collection = await getCollection("zookeepers");
        const result = await collection.updateOne(
            { _id: new ObjectId(zookeeperId) },
            { $set: { animal_id: animalId } }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Failed to assign animal to zookeeper');
        }

        // Add zookeeper to new animal's zookeeper_ids array
        const animalsCollection = await getCollection("animals");
        await animalsCollection.updateOne(
            { _id: new ObjectId(animalId) },
            { $addToSet: { zookeeper_ids: zookeeperId } }
        );

        return true;
    } catch (error) {
        console.error('DB: Error assigning animal to zookeeper:', error);
        throw error;
    }
}

export async function removeAnimalFromZookeeper(zookeeperId, animalId) {
    try {
        // Remove animal_id from zookeeper
        const collection = await getCollection("zookeepers");
        const result = await collection.updateOne(
            { _id: new ObjectId(zookeeperId) },
            { $unset: { animal_id: "" } }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Failed to remove animal from zookeeper');
        }

        // Remove zookeeper from animal's zookeeper_ids array
        const animalsCollection = await getCollection("animals");
        await animalsCollection.updateOne(
            { _id: new ObjectId(animalId) },
            { $pull: { zookeeper_ids: zookeeperId } }
        );

        return true;
    } catch (error) {
        console.error('DB: Error removing animal from zookeeper:', error);
        throw error;
    }
} 