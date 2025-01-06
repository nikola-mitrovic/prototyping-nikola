/**
 * TEST ENDPOINT - Database Function Testing
 * 
 * This is a test endpoint created during development to verify database functions.
 * It tests the following operations:
 * 1. Getting all animals
 * 2. Creating a test animal
 * 3. Getting a specific animal
 * 4. Updating an animal
 * 5. Getting the updated animal
 * 
 * To use: Visit /test/db in your browser
 * Status: Keep for reference and future testing
 */

import { getAnimals, createAnimal, getAnimal, updateAnimal } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        console.log('TEST: Starting database test');
        
        // 1. Get all animals first
        console.log('TEST: Getting all animals');
        const allAnimals = await getAnimals();
        console.log('TEST: Current animals:', allAnimals);

        // 2. Create a test animal
        const testAnimal = {
            name: "Test Lion",
            nickname: "Testy",
            age: 5,
            gender: "Male",
            diet: "carnivore",
            arrival_date: "01.01.2024"
        };
        console.log('TEST: Creating test animal');
        const newId = await createAnimal(testAnimal);
        console.log('TEST: Created animal with ID:', newId);

        // 3. Get the created animal
        console.log('TEST: Getting created animal');
        const createdAnimal = await getAnimal(newId);
        console.log('TEST: Retrieved animal:', createdAnimal);

        // 4. Update the animal
        const updates = {
            nickname: "Updated Testy",
            age: 6
        };
        console.log('TEST: Updating animal');
        await updateAnimal(newId, updates);

        // 5. Get updated animal
        console.log('TEST: Getting updated animal');
        const updatedAnimal = await getAnimal(newId);
        console.log('TEST: Updated animal:', updatedAnimal);

        return json({
            success: true,
            message: 'Database test completed successfully',
            initialAnimals: allAnimals,
            createdAnimal: createdAnimal,
            updatedAnimal: updatedAnimal
        });
    } catch (err) {
        console.error('TEST: Error during database test:', err);
        return json({
            success: false,
            error: err.message
        }, { status: 500 });
    }
} 