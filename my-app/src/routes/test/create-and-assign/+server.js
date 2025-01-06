import { createAnimal, createZookeeper, assignKeeperToAnimal, getAnimal, getZookeeper } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // 1. Create a test animal
        const testAnimal = {
            name: "Test Giraffe",
            nickname: "Spots",
            age: 3,
            gender: "Female",
            diet: "herbivore",
            arrival_date: "01.02.2024"
        };
        console.log('TEST: Creating test animal');
        const animalId = await createAnimal(testAnimal);
        console.log('TEST: Created animal with ID:', animalId);
        
        // 2. Create a test zookeeper
        const testKeeper = {
            first_name: "Test",
            last_name: "Keeper",
            gender: "Male",
            hire_date: "01.02.2024"
        };
        console.log('TEST: Creating test zookeeper');
        const keeperId = await createZookeeper(testKeeper);
        console.log('TEST: Created keeper with ID:', keeperId);
        
        // 3. Assign keeper to animal
        console.log('TEST: Assigning keeper to animal');
        await assignKeeperToAnimal(animalId, keeperId);
        
        // 4. Verify the assignment
        console.log('TEST: Verifying assignment');
        const updatedKeeper = await getZookeeper(keeperId);
        const updatedAnimal = await getAnimal(animalId);
        
        return json({
            message: 'Test completed successfully',
            animal: {
                id: animalId,
                data: updatedAnimal
            },
            keeper: {
                id: keeperId,
                data: updatedKeeper
            }
        });
    } catch (error) {
        console.error('TEST: Error during test:', error);
        return json({ error: error.message }, { status: 500 });
    }
} 