import db from '$lib/db.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const zookeeper = await db.getZookeeper(params.id);
        
        if (!zookeeper) {
            throw error(404, 'Zookeeper not found');
        }

        // If zookeeper has an assigned animal, fetch its details
        let assignedAnimal = null;
        if (zookeeper.animal_id) {
            assignedAnimal = await db.getAnimal(zookeeper.animal_id);
        }

        return {
            zookeeper,
            assignedAnimal
        };
    } catch (err) {
        console.error('Error loading zookeeper:', err);
        throw error(500, 'Error loading zookeeper details');
    }
} 