import { getAnimals } from '$lib/db/animals.js';
import { getZookeepers } from '$lib/db/zookeepers.js';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const [animals, zookeepers] = await Promise.all([
            getAnimals(),
            getZookeepers()
        ]);

        return {
            animals,
            zookeepers
        };
    } catch (err) {
        console.error('Error loading dashboard data:', err);
        throw error(500, {
            message: 'Failed to load dashboard data'
        });
    }
} 