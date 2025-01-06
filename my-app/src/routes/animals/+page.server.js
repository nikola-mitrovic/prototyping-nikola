import { getAnimals } from '$lib/db/animals.js';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const animals = await getAnimals();
        return {
            animals
        };
    } catch (err) {
        console.error('Error loading animals:', err);
        throw error(500, {
            message: 'Failed to load animals'
        });
    }
} 