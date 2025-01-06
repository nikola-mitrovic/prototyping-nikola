import db from '$lib/db.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export async function load({ params }) {
    try {
        // Validate ID format first
        if (!ObjectId.isValid(params.id)) {
            throw error(400, {
                message: 'Invalid zookeeper ID format',
                code: 'INVALID_ID'
            });
        }

        const zookeeper = await db.getZookeeper(params.id);
        
        if (!zookeeper) {
            throw error(404, {
                message: 'Zookeeper not found',
                code: 'NOT_FOUND'
            });
        }

        // Find the animal assigned to this zookeeper
        let assignedAnimal = null;
        try {
            if (zookeeper.animal_id) {
                // Get all animals and find the one with matching numeric ID
                const animals = await db.getAnimals();
                assignedAnimal = animals.find(animal => animal.id === zookeeper.animal_id);
                console.log('Looking for animal with ID:', zookeeper.animal_id);
                console.log('Found animal:', assignedAnimal);
            }
        } catch (err) {
            console.error('Error loading assigned animal:', err);
            return {
                zookeeper,
                assignedAnimal: null,
                animalError: true
            };
        }

        return {
            zookeeper,
            assignedAnimal,
            animalError: false
        };
    } catch (err) {
        console.error('Error loading zookeeper:', err);
        if (err.status === 404 || err.status === 400) {
            throw err;
        }
        throw error(500, {
            message: 'Error loading zookeeper details',
            code: 'SERVER_ERROR'
        });
    }
} 