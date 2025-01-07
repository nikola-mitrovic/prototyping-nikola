import { getCollection } from "./db-connection.js";

async function migrateZookeepersToAnimals() {
    try {
        console.log('Starting migration...');
        
        // Get collections
        const zookeepersCollection = await getCollection("zookeepers");
        const animalsCollection = await getCollection("animals");
        
        // Get all zookeepers that have an animal_id
        const zookeepers = await zookeepersCollection.find({ animal_id: { $exists: true } }).toArray();
        console.log(`Found ${zookeepers.length} zookeepers with animal assignments`);
        
        // Initialize zookeeper_ids array for all animals
        await animalsCollection.updateMany(
            {},
            { $set: { zookeeper_ids: [] } }
        );
        console.log('Initialized zookeeper_ids array for all animals');
        
        // Process each zookeeper
        for (const zookeeper of zookeepers) {
            if (zookeeper.animal_id) {
                // Add zookeeper ID to animal's zookeeper_ids array
                await animalsCollection.updateOne(
                    { id: zookeeper.animal_id },
                    { $addToSet: { zookeeper_ids: zookeeper._id.toString() } }
                );
                console.log(`Added zookeeper ${zookeeper._id} to animal ${zookeeper.animal_id}`);
            }
        }
        
        // Remove animal_id field from all zookeepers
        await zookeepersCollection.updateMany(
            {},
            { $unset: { animal_id: "" } }
        );
        console.log('Removed animal_id field from all zookeepers');
        
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    }
}

// Run the migration
migrateZookeepersToAnimals().then(() => {
    console.log('Migration script finished');
    process.exit(0);
}).catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
}); 