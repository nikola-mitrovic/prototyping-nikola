import db from '$lib/db.js';

export async function load() {
    try {
        const animals = await db.getAnimals();
        return {
            animals
        };
    } catch (error) {
        console.error('Error loading animals:', error);
        return {
            animals: []
        };
    }
} 