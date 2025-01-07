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

export async function updateZookeeper(id, updatedData) {
    try {
        const collection = await getCollection("zookeepers");
        
        // Convert string ID to ObjectId
        const objectId = new ObjectId(id);
        
        // Remove _id from update data if it exists
        const { _id, ...updateData } = updatedData;
        
        // If we're removing animal_id, use $unset
        let updateOperation;
        if (updateData.animal_id === undefined) {
            updateOperation = { $unset: { animal_id: "" } };
        } else {
            updateOperation = { $set: updateData };
        }
        
        const result = await collection.updateOne(
            { _id: objectId },
            updateOperation
        );
        
        if (result.matchedCount === 0) {
            throw new Error('No document matched the ID');
        }
        if (result.modifiedCount === 0) {
            throw new Error('Document found but not modified');
        }
        
        return result;
    } catch (error) {
        console.error('DB: Error updating zookeeper:', error);
        throw error;
    }
} 