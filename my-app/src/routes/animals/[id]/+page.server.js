import { getAnimal } from '$lib/db/animals.js';
import { getZookeepers } from '$lib/db/zookeepers.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const animal = await getAnimal(params.id);
        
        if (!animal) {
            throw error(404, {
                message: 'Animal not found'
            });
        }

        // Get all zookeepers to show in the assignment modal
        let allZookeepers = [];
        let assignedZookeepers = [];
        let availableZookeepers = [];

        try {
            allZookeepers = await getZookeepers();
            
            // Filter to find assigned zookeepers (using numeric id)
            assignedZookeepers = allZookeepers.filter(keeper =>
                keeper.animal_id === animal.id
            );
            
            // Filter to find available zookeepers (not assigned to any animal)
            availableZookeepers = allZookeepers.filter(keeper =>
                !keeper.animal_id || keeper.animal_id === undefined
            );

            return {
                animal,
                assignedZookeepers,
                availableZookeepers,
                zookeeperError: false
            };
        } catch (err) {
            console.error('Error loading zookeepers:', err);
            return {
                animal,
                assignedZookeepers: [],
                availableZookeepers: [],
                zookeeperError: true
            };
        }
    } catch (err) {
        console.error('Error loading animal:', err);
        throw error(500, {
            message: 'Failed to load animal details'
        });
    }
} 