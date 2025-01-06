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

import { createAnimal, getAnimals } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // First get all animals to see current state
        console.log('TEST: Getting all current animals');
        const currentAnimals = await getAnimals();
        console.log('TEST: Current animals:', currentAnimals);

        // Create a test animal
        const testAnimal = {
            name: "Test Lion",
            nickname: "Leo",
            age: 5,
            gender: "Male",
            diet: "carnivore",
            arrival_date: "01.02.2024"
        };

        console.log('TEST: Creating test animal');
        const newId = await createAnimal(testAnimal);
        
        // Get animals again to verify ID assignment
        console.log('TEST: Getting updated animals list');
        const updatedAnimals = await getAnimals();
        
        return json({
            message: 'Test completed',
            newAnimalId: newId,
            currentAnimals: currentAnimals,
            updatedAnimals: updatedAnimals
        });
    } catch (error) {
        console.error('TEST: Error during test:', error);
        return json({ error: error.message }, { status: 500 });
    }
} 