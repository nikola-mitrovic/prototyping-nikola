import db from '$lib/db.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export async function load({ params }) {
    try {
        // Validate ID format first
        if (!ObjectId.isValid(params.id)) {
            throw error(400, {
                message: 'Invalid animal ID format',
                code: 'INVALID_ID'
            });
        }

        const animal = await db.getAnimal(params.id);
        
        if (!animal) {
            throw error(404, {
                message: 'Animal not found',
                code: 'NOT_FOUND'
            });
        }

        // Find all zookeepers assigned to this animal
        let assignedZookeepers = [];
        try {
            const zookeepers = await db.getZookeepers();
            // Get the numeric ID from the animal
            const animalNumericId = animal.id;
            // Find all zookeepers assigned to this animal
            assignedZookeepers = zookeepers.filter(keeper => 
                keeper.animal_id === animalNumericId
            );

            console.log('Animal numeric ID:', animalNumericId);
            console.log('Found zookeepers:', assignedZookeepers);
        } catch (err) {
            console.error('Error loading assigned zookeepers:', err);
            return {
                animal,
                assignedZookeepers: [],
                zookeeperError: true
            };
        }

        return {
            animal,
            assignedZookeepers,
            zookeeperError: false
        };
    } catch (err) {
        console.error('Error loading animal:', err);
        if (err.status === 404 || err.status === 400) {
            throw err;
        }
        throw error(500, {
            message: 'Error loading animal details',
            code: 'SERVER_ERROR'
        });
    }
} 