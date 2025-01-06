import { getZookeeper } from '$lib/db/zookeepers.js';
import { getAnimal } from '$lib/db/animals.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        console.log('Loading zookeeper details for ID:', params.id);
        const zookeeper = await getZookeeper(params.id);
        
        if (!zookeeper) {
            throw error(404, {
                message: 'Zookeeper not found'
            });
        }

        // Find the animal assigned to this zookeeper
        let assignedAnimal = null;
        if (zookeeper.animal_id) {
            try {
                // Get the specific animal directly instead of fetching all animals
                assignedAnimal = await getAnimal(zookeeper.animal_id);
                console.log('Found assigned animal:', assignedAnimal);
            } catch (err) {
                console.error('Error loading assigned animal:', err);
                // Continue without the animal data
            }
        }

        // Return the data in a serializable format
        return {
            zookeeper: {
                ...zookeeper,
                _id: zookeeper._id.toString()
            },
            assignedAnimal: assignedAnimal ? {
                ...assignedAnimal,
                _id: assignedAnimal._id.toString()
            } : null
        };

    } catch (err) {
        console.error('Error loading zookeeper:', err);
        throw error(500, {
            message: 'Failed to load zookeeper details'
        });
    }
} 