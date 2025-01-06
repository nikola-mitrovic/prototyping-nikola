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