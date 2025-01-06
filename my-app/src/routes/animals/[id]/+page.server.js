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

        // Get all zookeepers to show in the assignment modal
        let allZookeepers = [];
        let assignedZookeepers = [];
        let availableZookeepers = [];
        
        try {
            allZookeepers = await getZookeepers();
            console.log('Found all zookeepers:', allZookeepers);
            
            // Filter to find assigned zookeepers (using numeric id)
            assignedZookeepers = allZookeepers.filter(keeper => 
                keeper.animal_id === animal.id
            );
            console.log('Found assigned zookeepers:', assignedZookeepers);
            
            // Filter to find available zookeepers (not assigned to any animal)
            availableZookeepers = allZookeepers.filter(keeper => 
                !keeper.animal_id || keeper.animal_id === undefined
            );
            console.log('Found available zookeepers:', availableZookeepers);

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