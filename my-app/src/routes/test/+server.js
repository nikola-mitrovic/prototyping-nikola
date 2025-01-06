/**
 * TEST ENDPOINT - General API Testing
 * 
 * This endpoint was created during development to test the database API layer.
 * It provides a more structured test output compared to the db/+server.js endpoint.
 * 
 * Tests:
 * 1. getAnimals() - Retrieves all animals
 * 2. createAnimal() - Creates a test animal
 * 3. getAnimal() - Retrieves specific animal
 * 4. updateAnimal() - Updates animal data
 * 5. deleteAnimal() - Removes test animal
 * 
 * To use: Visit /test in your browser
 * Status: Keep for API testing and verification
 */

import db from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    const results = {
        tests: [],
        success: true
    };

    try {
        // Test 1: Get all animals
        const animals = await db.getAnimals();
        results.tests.push({
            name: 'getAnimals',
            success: true,
            result: animals
        });

        // Test 2: Create animal
        const newAnimal = {
            name: "Test Monkey",
            gender: "Female",
            arrival_date: new Date().toISOString(),
            age: 5,
            diet: "omnivore"
        };
        const createdId = await db.createAnimal(newAnimal);
        results.tests.push({
            name: 'createAnimal',
            success: !!createdId,
            result: { id: createdId }
        });

        // Test 3: Get single animal
        const createdAnimal = await db.getAnimal(createdId);
        results.tests.push({
            name: 'getAnimal',
            success: !!createdAnimal,
            result: createdAnimal
        });

        // Test 4: Update animal
        createdAnimal.age = 6;
        createdAnimal.diet = "herbivore";
        const updatedId = await db.updateAnimal(createdAnimal);
        const updatedAnimal = await db.getAnimal(updatedId);
        results.tests.push({
            name: 'updateAnimal',
            success: updatedAnimal.age === 6 && updatedAnimal.diet === "herbivore",
            result: updatedAnimal
        });

        // Test 5: Delete animal
        const deletedId = await db.deleteAnimal(createdId);
        const deletedAnimal = await db.getAnimal(deletedId);
        results.tests.push({
            name: 'deleteAnimal',
            success: !deletedAnimal,
            result: { deleted: !deletedAnimal }
        });

    } catch (error) {
        results.success = false;
        results.error = error.message;
    }

    return json(results);
} 