import { json } from '@sveltejs/kit';
import { getCollection } from '$lib/db/db-connection.js';

/** @type {import('./$types').RequestHandler} */
export async function POST() {
    try {
        console.log('Starting animal data validation...');
        
        const animalsCollection = await getCollection("animals");
        const animals = await animalsCollection.find({}).toArray();
        
        console.log(`Found ${animals.length} animals to validate`);
        
        let fixedCount = 0;
        
        // Check and fix each animal
        for (const animal of animals) {
            let needsUpdate = false;
            const updates = {};
            
            // Check zookeeper_ids
            if (!animal.zookeeper_ids || !Array.isArray(animal.zookeeper_ids)) {
                updates.zookeeper_ids = [];
                needsUpdate = true;
            }
            
            // Apply updates if needed
            if (needsUpdate) {
                await animalsCollection.updateOne(
                    { _id: animal._id },
                    { $set: updates }
                );
                fixedCount++;
                console.log(`Fixed animal: ${animal._id}`);
            }
        }
        
        console.log(`Validation complete. Fixed ${fixedCount} animals.`);
        
        return json({
            message: `Validation complete. Fixed ${fixedCount} animals.`,
            fixedCount
        });
    } catch (error) {
        console.error('Validation failed:', error);
        return json(
            { error: 'Validation failed' },
            { status: 500 }
        );
    }
} 