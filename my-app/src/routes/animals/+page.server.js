import { getAnimals } from '$lib/db.js';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        console.log('Loading animals page...');
        const animals = await getAnimals();
        console.log('Loaded animals:', animals);

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