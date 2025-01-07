import { json } from '@sveltejs/kit';
import { removeZookeeperFromAnimal } from '$lib/db/animals.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
    try {
        const { animal_id } = await request.json();
        
        if (!animal_id) {
            return json(
                { error: 'Animal ID is required' },
                { status: 400 }
            );
        }

        await removeZookeeperFromAnimal(animal_id, params.id);

        return json(
            { message: 'Animal removed successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('API: Error removing animal:', error);
        return json(
            { error: error.message || 'Failed to remove animal' },
            { status: 500 }
        );
    }
} 