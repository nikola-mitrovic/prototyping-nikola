import { json } from '@sveltejs/kit';
import { addZookeeperToAnimal } from '$lib/db/animals.js';

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

        await addZookeeperToAnimal(animal_id, params.id);

        return json(
            { message: 'Animal assigned successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('API: Error assigning animal:', error);
        return json(
            { error: error.message || 'Failed to assign animal' },
            { status: 500 }
        );
    }
} 