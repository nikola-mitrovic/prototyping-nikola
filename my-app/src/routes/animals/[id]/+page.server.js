import { getAnimal, getAnimalZookeepers } from '$lib/db/animals.js';
import { getZookeepers } from '$lib/db/zookeepers.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        const animal = await getAnimal(params.id);
        if (!animal) {
            throw error(404, 'Animal not found');
        }

        // Get all assigned zookeepers for this animal
        const assignedZookeepers = await getAnimalZookeepers(params.id);

        // Get all zookeepers for assignment dropdown
        const allZookeepers = await getZookeepers();
        
        // Filter out already assigned zookeepers
        const availableZookeepers = allZookeepers.filter(zookeeper => 
            !assignedZookeepers.some(assigned => assigned._id === zookeeper._id)
        );

        return {
            animal,
            assignedZookeepers,
            availableZookeepers
        };
    } catch (e) {
        console.error('Error loading animal details:', e);
        throw error(500, 'Error loading animal details');
    }
} 