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

export async function getZookeeper(id) {
    try {
        console.log('DB: Getting zookeeper with ID:', id);
        const collection = await getCollection("zookeepers");
        const keeper = await collection.findOne({ _id: new ObjectId(id) });
        if (keeper) {
            keeper._id = keeper._id.toString();
        }
        console.log('DB: Found zookeeper:', keeper);
        return keeper;
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
        
        const highestId = Math.max(...zookeepers.map(keeper => keeper.id || 0));
        console.log('DB: Current highest zookeeper ID:', highestId);
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
        console.log('DB: Assigning new zookeeper ID:', zookeeper.id);
        
        console.log('DB: Creating new zookeeper:', zookeeper);
        const collection = await getCollection("zookeepers");
        const result = await collection.insertOne(zookeeper);
        console.log('DB: Created zookeeper with ID:', result.insertedId);
        return result.insertedId.toString();
    } catch (error) {
        console.error('DB: Error creating zookeeper:', error);
        throw error;
    }
}

export async function assignKeeperToAnimal(animalId, keeperId) {
    try {
        console.log(`DB: Attempting to assign keeper ${keeperId} to animal ${animalId}`);
        
        // First verify both animal and keeper exist
        const animal = await getAnimal(animalId);
        const keeper = await getZookeeper(keeperId);
        
        if (!animal) {
            console.error('DB: Animal not found');
            throw new Error('Animal not found');
        }
        if (!keeper) {
            console.error('DB: Keeper not found');
            throw new Error('Keeper not found');
        }

        // Make sure the animal has a numeric ID
        if (!animal.id) {
            console.error('DB: Animal does not have a numeric ID');
            throw new Error('Animal does not have a valid ID');
        }
        
        console.log('DB: Found animal:', animal);
        console.log('DB: Found keeper:', keeper);
        
        // Update the keeper's animal_id
        const collection = await getCollection("zookeepers");
        const result = await collection.updateOne(
            { _id: new ObjectId(keeperId) },
            { $set: { animal_id: animal.id } }
        );
        
        console.log('DB: Assignment result:', result);
        
        if (result.modifiedCount === 0) {
            console.log('DB: No keeper was updated');
            throw new Error('Failed to update keeper');
        }
        
        console.log('DB: Successfully assigned keeper to animal');
        return true;
    } catch (error) {
        console.error('DB: Error assigning keeper to animal:', error);
        throw error;
    }
}

export async function updateZookeeper(id, updatedData) {
    try {
        console.log('DB: Updating zookeeper with ID:', id);
        console.log('DB: Update data:', updatedData);
        
        const collection = await getCollection("zookeepers");
        
        // Convert string ID to ObjectId
        const objectId = new ObjectId(id);
        console.log('DB: Converted ObjectId:', objectId);
        
        // Remove _id from update data if it exists
        const { _id, ...updateData } = updatedData;
        console.log('DB: Cleaned update data:', updateData);
        
        // If we're removing animal_id, use $unset
        let updateOperation;
        if (updateData.animal_id === undefined) {
            updateOperation = { $unset: { animal_id: "" } };
        } else {
            updateOperation = { $set: updateData };
        }
        console.log('DB: Update operation:', updateOperation);
        
        const result = await collection.updateOne(
            { _id: objectId },
            updateOperation
        );
        console.log('DB: Update result:', result);
        
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