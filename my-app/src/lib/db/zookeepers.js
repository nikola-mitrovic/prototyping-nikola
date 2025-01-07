import { ObjectId } from "mongodb";
import { getDb, getCollection } from "./db-connection.js";
import { getAnimal } from "./animals.js";

export async function getZookeepers() {
    let zookeepers = [];
    try {
        const collection = await getCollection("zookeepers");
        const query = {};
        zookeepers = await collection.find(query).toArray();
        console.log('DB: Found', zookeepers.length, 'zookeepers');
        
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

async function getHighestZookeeperId() {
    try {
        const collection = await getCollection("zookeepers");
        const zookeepers = await collection.find({}).toArray();
        
        if (!zookeepers || zookeepers.length === 0) {
            console.log('DB: No existing zookeepers, starting with ID 1');
            return 0;
        }
        
        const highestId = Math.max(...zookeepers.map(zookeeper => zookeeper.id || 0));
        return highestId;
    } catch (error) {
        console.error('DB: Error getting highest zookeeper ID:', error);
        throw error;
    }
}

export async function createZookeeper(zookeeper) {
    try {
        const highestId = await getHighestZookeeperId();
        zookeeper.id = highestId + 1;
        
        const collection = await getCollection("zookeepers");
        const result = await collection.insertOne(zookeeper);
        return result.insertedId.toString();
    } catch (error) {
        console.error('DB: Error creating zookeeper:', error);
        throw error;
    }
}

export async function assignZookeeperToAnimal(animalId, zookeeperId) {
    try {
        // First verify both animal and zookeeper exist
        const animal = await getAnimal(animalId);
        const zookeeper = await getZookeeper(zookeeperId);
        
        if (!animal) {
            console.error('DB: Animal not found');
            throw new Error('Animal not found');
        }
        if (!zookeeper) {
            console.error('DB: Zookeeper not found');
            throw new Error('Zookeeper not found');
        }

        // Make sure the animal has a numeric ID
        if (!animal.id) {
            console.error('DB: Animal does not have a numeric ID');
            throw new Error('Animal does not have a valid ID');
        }
        
        // Update the zookeeper's animal_id
        const collection = await getCollection("zookeepers");
        const result = await collection.updateOne(
            { _id: new ObjectId(zookeeperId) },
            { $set: { animal_id: animal.id } }
        );
        
        if (result.modifiedCount === 0) {
            throw new Error('Failed to update zookeeper');
        }
        
        return true;
    } catch (error) {
        console.error('DB: Error assigning zookeeper to animal:', error);
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

        // Get and return the updated zookeeper
        return await getZookeeper(id);
    } catch (error) {
        console.error('DB: Error updating zookeeper:', error);
        throw error;
    }
}

export async function deleteZookeeper(id) {
    try {
        // First, get the zookeeper to check if it exists
        const zookeeper = await getZookeeper(id);
        if (!zookeeper) {
            return null;
        }

        // Remove the zookeeper
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