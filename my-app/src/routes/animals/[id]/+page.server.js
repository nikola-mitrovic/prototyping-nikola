import { getAnimal, getZookeepers } from '$lib/db.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        console.log('Loading animal details for ID:', params.id);
        const animal = await getAnimal(params.id);
        
        if (!animal) {
            throw error(404, {
                message: 'Animal not found'
            });
        }

        // Find all zookeepers assigned to this animal
        let assignedZookeepers = [];
        try {
            const zookeepers = await getZookeepers();
            // Get the numeric ID from the animal
            const animalNumericId = animal.id;
            // Find all zookeepers assigned to this animal
            assignedZookeepers = zookeepers.filter(keeper => 
                keeper.animal_id === animalNumericId
            );

            console.log('Animal numeric ID:', animalNumericId);
            console.log('Found assigned zookeepers:', assignedZookeepers);
        } catch (err) {
            console.error('Error loading assigned zookeepers:', err);
            return {
                animal,
                assignedZookeepers: [],
                zookeeperError: true
            };
        }

        console.log('Loaded animal details:', animal);
        return {
            animal,
            assignedZookeepers,
            zookeeperError: false
        };
    } catch (err) {
        console.error('Error loading animal:', err);
        throw error(500, {
            message: 'Failed to load animal details'
        });
    }
} 