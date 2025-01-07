import { getZookeeper } from '$lib/db/zookeepers.js';
import { getZookeeperAssignedAnimals } from '$lib/db/zookeepers.js';
import { getAnimals } from '$lib/db/animals.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    try {
        const zookeeper = await getZookeeper(params.id);
        if (!zookeeper) {
            throw error(404, 'Zookeeper not found');
        }

        // Get all assigned animals for this zookeeper
        const assignedAnimals = await getZookeeperAssignedAnimals(params.id);

        // Get all animals for assignment dropdown
        const allAnimals = await getAnimals();
        
        // Filter out already assigned animals
        const availableAnimals = allAnimals.filter(animal => 
            !assignedAnimals.some(assigned => assigned._id === animal._id)
        );

        return {
            zookeeper,
            assignedAnimals,
            availableAnimals
        };
    } catch (e) {
        console.error('Error loading zookeeper details:', e);
        throw error(500, 'Error loading zookeeper details');
    }
} 