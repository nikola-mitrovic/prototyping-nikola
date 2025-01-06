import { getZookeeper, getAnimals } from '$lib/db.js';
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
        try {
            if (zookeeper.animal_id) {
                // Get all animals and find the one with matching numeric ID
                const animals = await getAnimals();
                assignedAnimal = animals.find(animal => animal.id === zookeeper.animal_id);
                console.log('Looking for animal with ID:', zookeeper.animal_id);
                console.log('Found assigned animal:', assignedAnimal);
            }
        } catch (err) {
            console.error('Error loading assigned animal:', err);
            return {
                zookeeper,
                assignedAnimal: null,
                animalError: true
            };
        }

        console.log('Loaded zookeeper details:', zookeeper);
        return {
            zookeeper,
            assignedAnimal,
            animalError: false
        };
    } catch (err) {
        console.error('Error loading zookeeper:', err);
        throw error(500, {
            message: 'Failed to load zookeeper details'
        });
    }
} 